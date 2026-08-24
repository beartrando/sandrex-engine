import BattleEntity from "../../../domain/battle/battle.entity";

import BoardMapper from "./battle/board.cache.mapper";
import StatusMapper from "./battle/status.cache.mapper";
import BattlePlayerIds from "../../../domain/battle/value-objects/battle-player-ids.vo";
import BattleId from "../../../domain/battle/value-objects/battle-id.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";

export interface BattleCacheObject {
    id: string;
    playerIds: string[];
    board: string[];
    status: string;
    winnerId: string | null;
    lastMoveAt: Date | null;
}

export class BattleCacheMapper {

    static toPersistence(battle: BattleEntity): BattleCacheObject {
        return {
            id: battle.id.value,
            playerIds: battle.playerIds.value.map((id: ProfileId) => id.value),
            board: BoardMapper.toPersistence(battle.board),
            status: StatusMapper.toPersistence(battle.status),
            winnerId: battle.winnerId?.value ?? null,
            lastMoveAt: battle.lastMoveAt,
        };
    }

    static toDomain(battle: BattleCacheObject): BattleEntity {
        const props = {
            id: new BattleId(battle.id),
            playerIds: new BattlePlayerIds(battle.playerIds.map((id: string) => new ProfileId(id))),
            board: BoardMapper.toDomain(battle.board),
            status: StatusMapper.toDomain(battle.status),
            winnerId: battle.winnerId ? new ProfileId(battle.winnerId) : null,
            lastMoveAt: battle.lastMoveAt,
        };

        return BattleEntity.create(props);
    }
}

export default BattleCacheMapper;
