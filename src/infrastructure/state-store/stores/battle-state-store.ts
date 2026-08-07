import Redis from "ioredis";

import BattleEntity from "../../../domain/entities/battle.entity";
import Id from "../../../domain/value-objects/id.vo";

import StateStore from "../state-store.interface";

const BATTLE_PREFIX = "battle:";
const BATTLE_INDEX = "battle:index";

export class BattleStateStore implements StateStore<BattleEntity> {
    constructor(
        private readonly redis: Redis,
    ) {
    }

    async save(
        battle: BattleEntity,
    ): Promise<void> {
        const key = `${BATTLE_PREFIX}${battle.id.value}`;

        await this.redis.set(
            key,
            JSON.stringify(battle),
        );

        await this.redis.sadd(
            BATTLE_INDEX,
            battle.id.value,
        );
    }

    async get(
        id: Id,
    ): Promise<BattleEntity | null> {
        const data = await this.redis.get(
            `${BATTLE_PREFIX}${id.value}`,
        );

        if (!data) {
            return null;
        }

        return JSON.parse(data) as BattleEntity;
    }

    async drop(
        id: Id,
    ): Promise<void> {
        await this.redis.del(
            `${BATTLE_PREFIX}${id.value}`,
        );

        await this.redis.srem(
            BATTLE_INDEX,
            id.value,
        );
    }

    async loadAll(): Promise<BattleEntity[]> {
        const ids = await this.redis.smembers(
            BATTLE_INDEX,
        );

        if (!ids.length) {
            return [];
        }

        const keys = ids.map(
            id => `${BATTLE_PREFIX}${id}`,
        );

        const values = await this.redis.mget(keys);

        return values
            .filter(Boolean)
            .map(
                value => JSON.parse(value!) as BattleEntity,
            );
    }
}

export default BattleStateStore;