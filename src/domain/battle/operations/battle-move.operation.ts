import BattleEntity from "../battle.entity";
import BattleMove from "../value-objects/battle-move.vo";

import BattleCellRule from "../rules/battle-cell.rule";
import BattleDrawRule from "../rules/battle-draw.rule";
import BattleTurnRule from "../rules/battle-turn.rule";
import BattleWinRule from "../rules/battle-win.rule";
import logger from "@shared/logger";

export class BattleMoveOperation {
    constructor(
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

        if (playerId.value != this.turnRule.calculate(entity).value) {
            return entity;
        }

        if (!this.cellRule.calculate(entity, move.cellIdx)) {
            logger.log('pupupu');
            return entity;
        }

        logger.log(entity)
        logger.log(move)
        entity.move(move);

        if (this.winRule.calculate(entity)) {
            entity.finish(playerId);
        } else if (this.drawRule.calculate(entity)) {
            entity.finish();
        }

        logger.log(entity)
        return entity;
    }
}

export default BattleMoveOperation;
