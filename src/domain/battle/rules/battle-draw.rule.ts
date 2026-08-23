import BattleEntity from "../battle.entity";
import BattleCellValueEnum from "../enums/battle-cell-value.enum";

export class BattleDrawRule {
    calculate(entity: BattleEntity): boolean {
        return entity.board.cells.every(
            cell => cell !== BattleCellValueEnum.EMPTY,
        );
    }
}

export default BattleDrawRule;
