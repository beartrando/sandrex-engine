import BattleId from "../../battle/value-objects/battle-id.vo";
import BattleMoveCellIdx from "./move/battle-move-cell-idx.vo";
import ProfileId from "../../profile/value-objects/profile-id.vo";

export type MoveProps = {
    battleId: BattleId;
    profileId: ProfileId;
    cellIdx: BattleMoveCellIdx;
};

export class BattleMove {
    private constructor(
        public readonly battleId: BattleId,
        public readonly profileId: ProfileId,
        public readonly cellIdx: BattleMoveCellIdx,
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
