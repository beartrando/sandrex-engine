import Id from "./id.vo";
import CellIdx from "./cell-idx.vo";

export type LeaveProps = {
    battleId: Id;
    profileId: Id;
};

export class BattleLeave {
    private constructor(
        public readonly battleId: Id,
        public readonly profileId: Id,
        public readonly cellIdx: CellIdx,
    ) {
    }

    static create(props: MoveProps): Move {
        return new Move(
            props.battleId,
            props.profileId,
            props.cellIdx,
        );
    }
}

export default BattleLeave;
