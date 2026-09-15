import BattleBoard from "./value-objects/battle-board.vo";
import BattlePlayerIds from "./value-objects/battle-player-ids.vo";
import BattlePlayerApprovals from "./value-objects/battle-player-approvals.vo";
import BattleStatus from "./value-objects/battle-status.vo";
import BattleStatusEnum from "./enums/battle-status.enum";
import BattleMove from "./value-objects/battle-move.vo";
import BattleId from "../battle/value-objects/battle-id.vo";
import ProfileId from "../profile/value-objects/profile-id.vo";

export type BattleEntityProps = {
    id: BattleId;
    playerIds: BattlePlayerIds;
    approvals?: BattlePlayerApprovals;
    board?: BattleBoard;
    status?: BattleStatus;
    winnerId?: ProfileId | null;
    lastMoveAt?: Date | null;
};

export class BattleEntity {
    constructor(
        readonly id: BattleId,
        readonly playerIds: BattlePlayerIds,
        public approvals: BattlePlayerApprovals,
        public board: BattleBoard,
        public status: BattleStatus,
        public winnerId: ProfileId | null,
        public lastMoveAt: Date | null,
    ) {
    }

    static create(props: BattleEntityProps): BattleEntity {
        return new BattleEntity(
            props.id,
            props.playerIds,
            props.approvals ?? BattlePlayerApprovals.empty(props.playerIds),
            props.board ?? BattleBoard.empty(),
            props.status ?? new BattleStatus(BattleStatusEnum.Created),
            props.winnerId ?? null,
            props.lastMoveAt ?? null,
        );
    }

    approve(profileId: ProfileId): BattleEntity {
        this.approvals.approve(profileId);

        return this;
    }

    isApproved(profileId: ProfileId): boolean {
        return this.approvals.isApproved(profileId);
    }

    move(move: BattleMove): BattleEntity {
        const cellValue = this.playerIds.cellValueOf(move.profileId);

        this.board = this.board.move(
            move.cellIdx.value,
            cellValue,
        );

        this.lastMoveAt = new Date();

        return this;
    }

    leave(profileId: ProfileId): BattleEntity {
        // logger.log(new Error().stack);

        this.status = new BattleStatus(BattleStatusEnum.Finished);
        this.winnerId = this.playerIds.opponentOf(profileId);

        return this;
    }

    finish(playerId?: ProfileId): BattleEntity {
        // logger.log(new Error().stack);
        this.status = new BattleStatus(BattleStatusEnum.Finished);
        if (playerId) {
            this.winnerId = playerId;
        }

        return this;
    }

    start(): BattleEntity {
        this.status = BattleStatus.create(BattleStatusEnum.Started);
        return this;
    }
}

export default BattleEntity;
