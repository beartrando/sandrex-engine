import Id from "../../value-objects/id.vo";
import Board from "./value-objects/board.vo";
import PlayerIds from "./value-objects/player-ids.vo";
import BattleStatus from "./value-objects/status.vo";
import BattleStatusEnum from "./enums/status.enum";
import BattleMove from "./value-objects/battle-move.vo";
import BattleLeave from "./value-objects/battle-leave.vo";

export type BattleEntityProps = {
    id?: Id;
    playerIds: PlayerIds;
    board?: Board;
    status?: BattleStatus;
    winnerId?: Id | null;
    lastMoveAt?: Date | null;
};

export class BattleEntity {
    constructor(
        readonly id: Id,
        readonly playerIds: PlayerIds,
        public board: Board,
        public status: BattleStatus,
        public winnerId: Id | null,
        public lastMoveAt: Date | null,
    ) {
    }

    static create(props: BattleEntityProps): BattleEntity {
        return new BattleEntity(
            props.id ?? Id.create(),
            props.playerIds,
            props.board ?? Board.empty(),
            props.status ?? new BattleStatus(BattleStatusEnum.New),
            props.winnerId ?? null,
            props.lastMoveAt ?? null,
        );
    }

    start(): BattleEntity {
        this.board = Board.empty();
        this.status = new BattleStatus(BattleStatusEnum.Active);
        this.winnerId = null;
        this.lastMoveAt = new Date();

        return this;
    }

    move(move: BattleMove): BattleEntity {
        this.board = this.board.move(move);
        this.lastMoveAt = new Date();

        return this;
    }

    leave(leave: BattleLeave): BattleEntity {
        this.status = new BattleStatus(BattleStatusEnum.Finished);
        this.winnerId = !leave.playerId;
        this.lastMoveAt = new Date();

        return this;
    }

    finish(playerId?: Id): BattleEntity {
        this.status = new BattleStatus(BattleStatusEnum.Finished);
        if (playerId) {
            this.winnerId = leave.playerId;
        }

        return this;
    }
}

export default BattleEntity;
