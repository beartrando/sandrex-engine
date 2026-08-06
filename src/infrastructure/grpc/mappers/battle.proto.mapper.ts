import * as battleProto from "../../../contracts/proto/battle";
import BattleEntity, {BattleEntityProps} from "../../../domain/entities/battle.entity";
import BattleBoardProtoMapper from "./battle/board.proto.mapper";
import BattleStatusProtoMapper from "./battle/status.proto.mapper";
import Id from "../../../domain/value-objects/id.vo";
import PlayerIds from "../../../domain/value-objects/battle/player-ids.vo";

export class BattleProtoMapper {
    static toProto(battle: BattleEntity): battleProto.BattleObject {

        return battleProto.BattleObject.create({
            id: battle.id.value,
            playerIds: battle.playerIds.value.map((id: Id) => id.value),
            board: BattleBoardProtoMapper.toProto(battle.board),
            status: BattleStatusProtoMapper.toProto(battle.status),
            winnerId: battle.winnerId?.value,
            lastMoveAt: battle.lastMoveAt ?? undefined,
        });
    }

    static toDomain(battle: battleProto.BattleObject): BattleEntity {
        const battleEntityProps: BattleEntityProps = {
            id: new Id(battle.id),
            playerIds: new PlayerIds(battle.playerIds.map((id: string) => new Id(id))),
            board: BattleBoardProtoMapper.toDomain(battle.board),
            status: BattleStatusProtoMapper.toDomain(battle.status),
            winnerId: battle.winnerId ? new Id(battle.winnerId) : null,
            lastMoveAt: battle.lastMoveAt,
        };
        return BattleEntity.create(battleEntityProps);
    }
}

export default BattleProtoMapper;
