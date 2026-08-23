import BattleBoard from "./value-objects/battle-board.vo";
import BattlePlayerIds from "./value-objects/battle-player-ids.vo";
import BattleStatus from "./value-objects/battle-status.vo";
import BattleStatusEnum from "./enums/battle-status.enum";
import BattleMove from "./value-objects/battle-move.vo";
import BattleLeave from "./value-objects/battle-leave.vo";
import Id from "../common/value-objects/id.vo";
import logger from "@shared/logger";

export type BattleEntityProps = {
    id: Id;
    playerIds: BattlePlayerIds;
    board?: BattleBoard;
    status?: BattleStatus;
    winnerId?: Id | null;
    lastMoveAt?: Date | null;
};

export class BattleEntity {
    constructor(
        readonly id: Id,
        readonly playerIds: BattlePlayerIds,
        public board: BattleBoard,
        public status: BattleStatus,
        public winnerId: Id | null,
        public lastMoveAt: Date | null,
    ) {
    }

    static create(props: BattleEntityProps): BattleEntity {
        return new BattleEntity(
            props.id,
            props.playerIds,
            props.board ?? BattleBoard.empty(),
            props.status ?? new BattleStatus(BattleStatusEnum.New),
            props.winnerId ?? null,
            props.lastMoveAt ?? null,
        );
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

    leave(profileId: Id): BattleEntity {
        // logger.log(new Error().stack);

        this.status = new BattleStatus(BattleStatusEnum.Finished);
        this.winnerId = this.playerIds.opponentOf(profileId);

        return this;
    }

    finish(playerId?: Id): BattleEntity {
        logger.log(new Error().stack);
        this.status = new BattleStatus(BattleStatusEnum.Finished);
        if (playerId) {
            this.winnerId = playerId;
        }

        return this;
    }
}

export default BattleEntity;
