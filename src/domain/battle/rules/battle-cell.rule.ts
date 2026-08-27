import BattleEntity from "../battle.entity";
import BattleMoveCellIdx from "../value-objects/move/battle-move-cell-idx.vo";
import BattleCellValueEnum from "../enums/battle-cell-value.enum";

export class BattleCellRule {
    calculate(
        entity: BattleEntity,
        cellIdx: BattleMoveCellIdx,
    ): boolean {
        return entity.board.cells[cellIdx.value] === BattleCellValueEnum.EMPTY;
    }
}

export default BattleCellRule;
