import BattleBoard from "../../../../domain/battle/value-objects/battle-board.vo";
import CellValueMapper from "./cell-value.cache.mapper";


export class BoardCacheMapper {

    static toPersistence(board: BattleBoard): string[] {
        return board.cells.map(CellValueMapper.toPersistence);
    }

    static toDomain(cells: readonly string[]): BattleBoard {
        return new BattleBoard(cells.map(CellValueMapper.toDomain));
    }
}

export default BoardCacheMapper;
