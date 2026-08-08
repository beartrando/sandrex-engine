// import Id from "../value-objects/id.vo";
// import Board from "../value-objects/battle/board.vo";
// import PlayerIds from "../value-objects/battle/player-ids.vo";
// import BattleStatus from "../value-objects/battle/status.vo";
// import BattleStatusEnum from "../enums/battle/status.enum";
// import BattleMove from "../value-objects/battle-move.vo";
// import BattleLeave from "../value-objects/battle-leave.vo";
//
// export type BattleEntityProps = {
//     id?: Id;
//     playerIds: PlayerIds;
//     board?: Board;
//     status?: BattleStatus;
//     winnerId?: Id | null;
//     lastMoveAt?: Date | null;
// };
//
// export class BattleEntity {
//     constructor(
//         readonly id: Id,
//         readonly playerIds: PlayerIds,
//         readonly board: Board,
//         readonly status: BattleStatus,
//         readonly winnerId: Id | null,
//         readonly lastMoveAt: Date | null,
//     ) {
//     }
//
//     static create(props: BattleEntityProps): BattleEntity {
//         const now = new Date();
//
//         return new BattleEntity(
//             props.id ?? Id.create(),
//             props.playerIds,
//             props.board ?? Board.empty(),
//             props.status ?? new BattleStatus(BattleStatusEnum.New),
//             props.winnerId ?? null,
//             props.lastMoveAt ?? null,
//         );
//     }
//
//     start(): BattleEntity {
//         return this;
//     }
//
//     leave(leave: BattleLeave): BattleEntity {
//         return this;
//     }
//     move(move: BattleMove): BattleEntity {
//         return this;
//     }
// }
//
// export default BattleEntity;
