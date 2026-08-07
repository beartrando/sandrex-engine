import Redis from "ioredis";

import BattleEntity from "../../../domain/entities/battle.entity";
import Id from "../../../domain/value-objects/id.vo";

import StateStore from "../state-store.interface";

export class BattleStateStore implements StateStore<BattleEntity> {

    constructor(
        private readonly redis: Redis,
    ) {
    }

    async save(
        battle: BattleEntity,
    ): Promise<void> {
        await this.redis.set(
            `battle:${battle.id.value}`,
            JSON.stringify(battle),
        );
    }

    async get(
        id: Id,
    ): Promise<BattleEntity | null> {
        const data = await this.redis.get(
            `battle:${id.value}`,
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
            `battle:${id.value}`,
        );
    }

    async loadAll(): Promise<BattleEntity[]> {
        const keys = await this.redis.keys("battle:*");

        if (!keys.length) {
            return [];
        }

        const values = await this.redis.mget(keys);

        return values
            .filter(Boolean)
            .map(value => JSON.parse(value!) as BattleEntity);
    }
}

export default BattleStateStore;
