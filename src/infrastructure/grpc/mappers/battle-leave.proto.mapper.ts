import * as battleProto from "../../../contracts/proto/battle";
import Id from "../../../domain/value-objects/id.vo";
import BattleLeave from "../../../domain/value-objects/battle-leave.vo";

export class BattleLeaveProtoMapper {
    static toProto(move: BattleLeave): battleProto.MoveObject {
        return battleProto.MoveObject.create({
            battleId: move.battleId.value,
            profileId: move.profileId.value,
        });
    }

    static toDomain(move: battleProto.MoveObject): BattleLeave {
        return BattleLeave.create({
            battleId: new Id(move.battleId),
            profileId: new Id(move.profileId),
        });
    }
}

export default BattleLeaveProtoMapper;
