import BattleId from "./battle-id.vo";
import ProfileId from "../../profile/value-objects/profile-id.vo";

export type LeaveProps = {
    battleId: BattleId;
    profileId: ProfileId;
};

export class BattleLeave {
    public constructor(
        public readonly battleId: BattleId,
        public readonly profileId: ProfileId,
    ) {
    }

    static create(props: LeaveProps): BattleLeave {
        return new BattleLeave(
            props.battleId,
            props.profileId,
        );
    }
}

export default BattleLeave;
