import Id from "./id.vo";
import CellIdx from "./battle/move/cell-idx.vo";

export type LeaveProps = {
    battleId: Id;
    profileId: Id;
};

export class BattleLeave {
    private constructor(
        public readonly battleId: Id,
        public readonly profileId: Id,
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
