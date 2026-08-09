import BattleEntity from "../battle.entity";
import BattleMove from "../value-objects/battle-move.vo";

import BattleCellRule from "../rules/battle-cell.rule";
import BattleDrawRule from "../rules/battle-draw.rule";
import BattleTurnRule from "../rules/battle-turn.rule";
import BattleWinRule from "../rules/battle-win.rule";

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

        this.turnRule.calculate(entity, playerId);
        this.cellRule.calculate(entity, move.cellIdx);

        // применяем ход
        entity.move(move);

        if (this.winRule.calculate(entity)) {
            entity.finish(playerId);
            return entity;
        }

        if (this.drawRule.calculate(entity)) {
            entity.finish();
            return entity;
        }

        return entity;
    }
}

export default BattleMoveOperation;
