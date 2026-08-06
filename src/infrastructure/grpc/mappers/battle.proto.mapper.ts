import * as battleProto from "../../../contracts/proto/battle";
import BattleEntity from "../../../domain/entities/battle.entity";
import BattleBoardProtoMapper from "./battle-board.proto.mapper";
import BattleStatusProtoMapper from "./battle-status.proto.mapper";
import Id from "../../../domain/value-objects/id.vo";
import PlayerIds from "../../../domain/value-objects/player-ids.vo";
import Board from "../../../domain/value-objects/board.vo";
import BattleStatus from "../../../domain/value-objects/battle-status.vo";

export class BattleProtoMapper {
    static toProto(battle: BattleEntity): battleProto.BattleObject {

        return battleProto.BattleObject.create({
            id: battle.id.value,
            playerIds: battle.playerIds.value.map(id => id.value),
            board: BattleBoardProtoMapper.toProto(battle.board),
            status: BattleStatusProtoMapper.toProto(battle.status),
            winnerId: battle.winnerId?.value,
            lastMoveAt: battle.lastMoveAt ?? undefined,
        });
    }

    static toDomain(battle: battleProto.BattleObject): BattleEntity {
        new Id(battle.id),
        new PlayerIds(battle.playerIds.map(id => new Id(id))),
        BattleBoardProtoMapper.toD
    readonly board: Board,
    readonly status: BattleStatus,
    readonly winnerId: Id | null,
    readonly lastMoveAt: Date | null,




                                           id: battle.id.value,
                                           playerIds: battle.playerIds.value.map(id => id.value),
                                           board: BattleBoardProtoMapper.toProto(battle.board),
                                           status: BattleStatusProtoMapper.toProto(battle.status),
                                           winnerId: battle.winnerId?.value,
                                           lastMoveAt: battle.lastMoveAt ?? undefined,

    }
}

export default BattleProtoMapper;
