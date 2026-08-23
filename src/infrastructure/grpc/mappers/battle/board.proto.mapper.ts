import * as battleProto from "../../../../contracts/proto/battle";
import CellValueProtoMapper from "./cell-value.proto.mapper";
import BattleBoard from "../../../../domain/battle/value-objects/battle-board.vo";

export class BoardProtoMapper {

    static toProto(board: BattleBoard): battleProto.BattleCellValue[] {
        return board.cells.map(CellValueProtoMapper.toProto);
    }

    static toDomain(
        cells: readonly battleProto.BattleCellValue[],
    ): BattleBoard {
        return new BattleBoard(cells.map(CellValueProtoMapper.toDomain));
    }
}

export default BoardProtoMapper;
