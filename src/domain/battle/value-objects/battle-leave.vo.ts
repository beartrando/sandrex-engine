import BattleId from "./battle-id.vo";

export type LeaveProps = {
    battleId: BattleId;
    profileId: BattleId;
};

export class BattleLeave {
    public constructor(
        public readonly battleId: BattleId,
        public readonly profileId: BattleId,
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
