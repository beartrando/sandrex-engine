import BattleEntity from "../../../domain/entities/battle.entity";
import Id from "../../../domain/value-objects/id.vo";

import StateStore from "../state-store.interface";
import RedisProvider from "../interfaces/redis-provider";
import BattleRedisMapper from "../mappers/battle.redis.mapper";

const BATTLE_PREFIX = "battle:";
const BATTLE_INDEX = "battle:index";

export class BattleStateStore implements StateStore<BattleEntity> {
    constructor(
        private readonly redis: RedisProvider,
    ) {
    }

    async save(
        battle: BattleEntity,
    ): Promise<void> {
        const key = `${BATTLE_PREFIX}${battle.id.value}`;

        await this.redis.client.set(
            key,
            JSON.stringify(BattleRedisMapper.toPersistence(battle))
        );

        await this.redis.client.sadd(
            BATTLE_INDEX,
            battle.id.value,
        );
    }

    async get(
        id: Id,
    ): Promise<BattleEntity | null> {
        const data = await this.redis.client.get(
            `${BATTLE_PREFIX}${id.value}`,
        );

        if (!data) {
            return null;
        }

        return BattleRedisMapper.toDomain(JSON.parse(data));
    }

    async drop(
        id: Id,
    ): Promise<void> {
        await this.redis.client.del(
            `${BATTLE_PREFIX}${id.value}`,
        );

        await this.redis.client.srem(
            BATTLE_INDEX,
            id.value,
        );
    }

    async loadAll(): Promise<BattleEntity[]> {
        const ids = await this.redis.client.smembers(
            BATTLE_INDEX,
        );

        if (!ids.length) {
            return [];
        }

        const keys = ids.map(
            id => `${BATTLE_PREFIX}${id}`,
        );

        const values = await this.redis.client.mget(keys);

        return values
            .filter(
                (value): value is string => value !== null,
            )
            .map(
                value => BattleRedisMapper.toDomain(JSON.parse(value)),
            );
    }
}

export default BattleStateStore;
