import * as engineProto from "../../../contracts/proto/engine";
import BattleId from "../../../domain/battle/value-objects/battle-id.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";
import BattleStart from "../../../domain/battle/value-objects/battle-start.vo";

export class BattleStartProtoMapper {
    static toProto(approve: BattleStart): engineProto.BattleStart {
        return engineProto.BattleStart.create({
            battleId: approve.battleId.value,
            profileId: approve.profileId.value,
        });
    }

    static toDomain(approve: engineProto.BattleStart): BattleStart {
        return BattleStart.create({
            battleId: new BattleId(approve.battleId),
            profileId: new ProfileId(approve.profileId),
        });
    }
}

export default BattleStartProtoMapper;
