import BattleEntity from "../../../domain/entities/battle.entity";
import Id from "../../../domain/value-objects/id.vo";

import StateStore from "../interface/state-store.interface";
import BattleRedisMapper from "../mappers/battle.redis.mapper";

const BATTLE_PREFIX = "battle:";
const BATTLE_INDEX = "battle:index";

export class BattleStateStore implements StateStore<BattleEntity> {

    private _client?: Redis;

    protected get client(): Redis {
        if (!this._client) {
            throw new Error("Redis client is not initialized");
        }

        return this._client;
    }

    setClient(client: Redis): void {
        this._client = client;
    }
    
    async save(
        battle: BattleEntity,
    ): Promise<void> {
        const key = `${BATTLE_PREFIX}${battle.id.value}`;

        await this.client.set(
            key,
            JSON.stringify(BattleRedisMapper.toPersistence(battle))
        );

        await this.client.sadd(
            BATTLE_INDEX,
            battle.id.value,
        );
    }

    async get(
        id: Id,
    ): Promise<BattleEntity | null> {
        const data = await this.client.get(
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
        await this.client.del(
            `${BATTLE_PREFIX}${id.value}`,
        );

        await this.client.srem(
            BATTLE_INDEX,
            id.value,
        );
    }

    async loadAll(): Promise<BattleEntity[]> {
        const ids = await this.client.smembers(
            BATTLE_INDEX,
        );

        if (!ids.length) {
            return [];
        }

        const keys = ids.map(
            id => `${BATTLE_PREFIX}${id}`,
        );

        const values = await this.client.mget(keys);

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
