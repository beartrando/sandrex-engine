import * as battleProto from "../../../contracts/proto/battle";
import * as engineProto from "../../../contracts/proto/engine";
import BattleMove from "../../../domain/value-objects/battle-move.vo";
import Id from "../../../domain/value-objects/id.vo";
import CellIdx from "../../../domain/value-objects/battle/move/cell-idx.vo";

export class BattleMoveProtoMapper {
    static toProto(move: BattleMove): engineProto.BattleMove {
        return engineProto.BattleMove.create({
            battleId: move.battleId.value,
            profileId: move.profileId.value,
            cellIdx: move.cellIdx.value,
        });
    }

    static toDomain(move: engineProto.BattleMove): BattleMove {
        return BattleMove.create({
            battleId: new Id(move.battleId),
            profileId: new Id(move.profileId),
            cellIdx: new CellIdx(move.cellIdx),
        });
    }
}

export default BattleMoveProtoMapper;
