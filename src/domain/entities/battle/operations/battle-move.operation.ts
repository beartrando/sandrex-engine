import BattleMove from "../../../value-objects/battle-move.vo";
import BattleEntity from "../battle.entity";

export class BattleMoveOperation {
    execute(
        battle: BattleEntity,
        move: BattleMove,
    ): BattleEntity {
        return battle.move(move);
    }
}

export default BattleMoveOperation;
