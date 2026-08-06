import * as battleProto from "../../../contracts/proto/battle";
import BattleMove from "../../../domain/value-objects/battle-move.vo";
import Id from "../../../domain/value-objects/id.vo";
import CellIdx from "../../../domain/value-objects/cell-idx.vo";

export class BattleMoveProtoMapper {
    static toProto(move: BattleMove): battleProto.MoveObject {
        return battleProto.MoveObject.create({
            battleId: move.battleId.value,
            profileId: move.profileId.value,
            cellIdx: move.cellIdx.value,
        });
    }

    static toDomain(move: battleProto.MoveObject): BattleMove {
        return BattleMove.create({
            battleId: new Id(move.battleId),
            profileId: new Id(move.profileId),
            cellIdx: new CellIdx(move.cellIdx),
        });
    }
}

export default BattleMoveProtoMapper;
