import BattleEntity, {BattleEntityProps,} from "../../../domain/battle/battle.entity";


import BoardMapper from "./battle/board.cache.mapper";
import StatusMapper from "./battle/status.cache.mapper";
import Id from "../../../domain/common/value-objects/id.vo";
import BattlePlayerIds from "../../../domain/battle/value-objects/battle-player-ids.vo";

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
            playerIds: battle.playerIds.value.map((id: Id) => id.value),
            board: BoardMapper.toPersistence(battle.board),
            status: StatusMapper.toPersistence(battle.status),
            winnerId: battle.winnerId?.value ?? null,
            lastMoveAt: battle.lastMoveAt,
        };
    }

    static toDomain(battle: BattleCacheObject): BattleEntity {
        const props: BattleEntityProps = {
            id: new Id(battle.id),
            playerIds: new BattlePlayerIds(battle.playerIds.map((id: string) => new Id(id))),
            board: BoardMapper.toDomain(battle.board),
            status: StatusMapper.toDomain(battle.status),
            winnerId: battle.winnerId ? new Id(battle.winnerId) : null,
            lastMoveAt: battle.lastMoveAt,
        };

        return BattleEntity.create(props);
    }
}

export default BattleCacheMapper;
