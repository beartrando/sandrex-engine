import * as engineProto from "../../../contracts/proto/engine";
import BattleLeave from "../../../domain/battle/value-objects/battle-leave.vo";
import BattleId from "../../../domain/battle/value-objects/battle-id.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";

export class BattleLeaveProtoMapper {
    static toProto(move: BattleLeave): engineProto.BattleLeave {
        return engineProto.BattleLeave.create({
            battleId: move.battleId.value,
            profileId: move.profileId.value,
        });
    }

    static toDomain(move: engineProto.BattleLeave): BattleLeave {
        return BattleLeave.create({
            battleId: new BattleId(move.battleId),
            profileId: new ProfileId(move.profileId),
        });
    }
}

export default BattleLeaveProtoMapper;
