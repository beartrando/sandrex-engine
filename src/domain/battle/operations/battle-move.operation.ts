import BattleEntity from "../battle.entity";
import BattleMove from "../value-objects/battle-move.vo";

import BattleCellRule from "../rules/battle-cell.rule";
import BattleDrawRule from "../rules/battle-draw.rule";
import BattleTurnRule from "../rules/battle-turn.rule";
import BattleWinRule from "../rules/battle-win.rule";
import BattleStatusEnum from "../enums/battle-status.enum";
import BattleStatusStartedRule from "../rules/battle-status-started.rule";

export class BattleMoveOperation {
    constructor(
        private readonly battleStatusStartedRule: BattleStatusStartedRule,
        private readonly cellRule: BattleCellRule,
        private readonly turnRule: BattleTurnRule,
        private readonly winRule: BattleWinRule,
        private readonly drawRule: BattleDrawRule,
    ) {
    }

    execute(
        entity: BattleEntity,
        move: BattleMove,
    ): BattleEntity {
        const playerId = move.profileId;

        const turnPlayerId = this.turnRule.calculate(entity);

        if (!this.battleStatusStartedRule.calculate(entity)) {
            throw new Error("Battle is not started");
        }

        if (!playerId.equals(turnPlayerId)) {
            throw new Error("Cannot move battle: not your turn");
        }

        if (!this.cellRule.calculate(entity, move.cellIdx)) {
            throw new Error("Cannot move battle: cell is not empty");
        }

        // logger.log(entity)
        // logger.log(move)
        entity.move(move);

        if (this.winRule.calculate(entity)) {
            entity.finish(playerId);
        } else if (this.drawRule.calculate(entity)) {
            entity.finish();
        }

        // logger.log(entity)
        return entity;
    }
}

export default BattleMoveOperation;
