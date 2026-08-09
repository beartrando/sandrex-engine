import BattleEntity from "../battle.entity";
import pgBossManager from "@shared/pg-boss-manager";
import {battleStore} from "../services/battle.service";

export class BattleStartOperation {
    constructor() {
    }

    execute(
        entity: BattleEntity,
    ): BattleEntity {

        // logger.log('New battle started', battle)
        battle.cells = Array(9).fill(battleProto.BattleCellValue.CELL_EMPTY);
        battle.status = battleProto.BattleStatus.ACTIVE;
        battle.winnerId = "";

        await battleStore().set(battle);
        await pgBossManager.queue.enqueue(messageProducersConfig.battleUpdated, battle);

        startMoveTimer(battle);

        return battle;

    }
}

export default BattleStartOperation;

