import BattleId from "./battle-id.vo";
import ProfileId from "../../profile/value-objects/profile-id.vo";

export type StartProps = {
    battleId: BattleId;
    profileId: ProfileId;
};

export class BattleStart {
    public constructor(
        public readonly battleId: BattleId,
        public readonly profileId: ProfileId,
    ) {
    }

    static create(props: StartProps): BattleStart {
        return new BattleStart(
            props.battleId,
            props.profileId,
        );
    }
}

export default BattleStart;
