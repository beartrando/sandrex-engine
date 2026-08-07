import {messageProducersConfig} from "../config/kafka.appConfig";
import {StoreRegistry, stores} from "./store-registry";
import * as battleProto from "../grpc/generated/battle";
import * as engineProto from "../grpc/generated/engine";
import {BattleStateStore} from "../stores/battleStateStore";
import pgBossManager from "@shared/pg-boss-manager";

import logger from "@shared/logger";
import domainConfig from "../config/config";

const moveTimers = new Map<string, NodeJS.Timeout>();

const moveTimeoutMs = (1000 * domainConfig.battleTurnTimeLimit);

function startMoveTimer(battle: battleProto.BattleObject) {
    stopMoveTimer(battle.id);

    const currentPlayer = battle.playerIds[turn(battle)];

    const timer = setTimeout(async () => {
        moveTimers.delete(battle.id);

        try {
            await leaveBattle(currentPlayer, battle.id);
        } catch (e) {
            logger.error(e);
        }
    }, moveTimeoutMs);

    moveTimers.set(battle.id, timer);
}

function stopMoveTimer(battleId: string) {
    const timer = moveTimers.get(battleId);

    if (timer) {
        clearTimeout(timer);
        moveTimers.delete(battleId);
    }
}

export function battleStore(): BattleStateStore {
    // убедимся, что сторы инициализированы
    const battleStore = StoreRegistry.getStore<BattleStateStore>(stores.BattleStateStore.key);

    if (!battleStore) {
        throw new Error('CacheStoreInterface is not registered. StoreRegistry.start() was not called.');
    }

    return battleStore;
}

export const battleNew = async (battle: battleProto.BattleObject): Promise<battleProto.BattleObject> => {
    // logger.log('New battle started', battle)
    battle.cells = Array(9).fill(battleProto.BattleCellValue.CELL_EMPTY);
    battle.status = battleProto.BattleStatus.ACTIVE;
    battle.winnerId = "";

    await battleStore().set(battle);
    await pgBossManager.queue.enqueue(messageProducersConfig.battleUpdated, battle);

    startMoveTimer(battle);

    return battle;

};

function getSymbolForUser(battle: battleProto.BattleObject, move: engineProto.BattleMove): battleProto.BattleCellValue {
    const idx = battle.playerIds.indexOf(move.profileId);
    if (idx === -1) throw new Error("User is not found in the battle");

    return idx === 0 ? battleProto.BattleCellValue.CELL_X : battleProto.BattleCellValue.CELL_O;
}

function verifyTurn(battle: battleProto.BattleObject, move: engineProto.BattleMove) {
    if (move.profileId != battle.playerIds[turn(battle)]) {
        throw new Error(`Not your turn`);
    }
}

function turn(battle: battleProto.BattleObject) {
    return battle.cells.filter(
        cell => cell !== battleProto.BattleCellValue.CELL_EMPTY
    ).length % battle.playerIds.length;
}

function verifyCell(battle: battleProto.BattleObject, move: engineProto.BattleMove) {
    if (battle.cells[move.cellIdx] != battleProto.BattleCellValue.CELL_EMPTY) {
        throw new Error(`Cell is not empty`);
    }
}

function isWin(battle: battleProto.BattleObject): boolean {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of winningCombos) {
        if (
            battle.cells[a] !== battleProto.BattleCellValue.CELL_EMPTY &&
            battle.cells[a] === battle.cells[b] &&
            battle.cells[a] === battle.cells[c]
        ) {
            return true;
        }
    }
    return false;
}

function isDraw(battle: battleProto.BattleObject): boolean {
    return !battle.cells.includes(battleProto.BattleCellValue.CELL_EMPTY);
}

export const makeMove = async (move: engineProto.BattleMove): Promise<battleProto.BattleObject> => {
    const battle: battleProto.BattleObject | undefined = await battleStore().get(move.battleId);

    if (!battle) {
        throw new Error(`Battle ${move.battleId} not found`);
    }

    try {
        verifyTurn(battle, move);
        verifyCell(battle, move);
    } catch (err) {
        logger.error(err);
        return battle;
    }

    battle.cells[move.cellIdx] = getSymbolForUser(battle, move);

    if (isWin(battle) || isDraw(battle)) {
        battle.status = battleProto.BattleStatus.FINISHED;
        if (isWin(battle)) {
            battle.winnerId = move.profileId;
        }
    }

    if (battle.status == battleProto.BattleStatus.FINISHED) {
        stopMoveTimer(battle.id);
        await battleStore().remove(battle.id);
    } else {
        await battleStore().set(battle);
        startMoveTimer(battle);
    }

    await pgBossManager.queue.enqueue(messageProducersConfig.battleUpdated, battle);

    return battle;
};

export const leaveBattle = async (profileId: string, battleId: string): Promise<battleProto.BattleObject | undefined> => {
    const battle = await battleStore().get(battleId);

    if (!battle) {

        logger.error(`Leave battle: Battle ${battleId} not found`);
        return;
    }

    if (!battle?.playerIds.includes(profileId)) {
        throw new Error(`Battle ${battleId} doesnt have player ${profileId}`);
    }

    const winnerId = battle.playerIds.find((id) => id !== profileId);

    battle.winnerId = winnerId ?? "";

    battle.status = battleProto.BattleStatus.FINISHED;

    stopMoveTimer(battle.id);
    await battleStore().remove(battle.id);

    await pgBossManager.queue.enqueue(messageProducersConfig.battleUpdated, battle);

    return battle;

};
