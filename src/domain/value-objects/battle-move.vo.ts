import Id from "./id.vo";
import CellIdx from "./cell-idx.vo";

export type MoveProps = {
    battleId: Id;
    profileId: Id;
    cellIdx: CellIdx;
};

export class BattleMove {
    private constructor(
        public readonly battleId: Id,
        public readonly profileId: Id,
        public readonly cellIdx: CellIdx,
    ) {
    }

    static create(props: MoveProps): BattleMove {
        return new BattleMove(
            props.battleId,
            props.profileId,
            props.cellIdx,
        );
    }
}

export default BattleMove;
