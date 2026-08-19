import Board from "../../../../domain/battle/value-objects/board.vo";
import CellValueMapper from "./cell-value.cache.mapper";


export class BoardCacheMapper {

    static toPersistence(board: Board): string[] {
        return board.cells.map(CellValueMapper.toPersistence);
    }

    static toDomain(cells: readonly string[]): Board {
        return new Board(cells.map(CellValueMapper.toDomain));
    }
}

export default BoardCacheMapper;
