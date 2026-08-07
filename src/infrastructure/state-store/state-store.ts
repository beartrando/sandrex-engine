import Id from "../../domain/value-objects/id.vo";

import StateStoreInterface from "./interfaces/state-store.interface";
import StateStoreMapper from "./interfaces/state-store-mapper";

export class StateStore<TEntity extends { id: Id }> implements StateStoreInterface<TEntity> {

    private _client?: Redis;

    constructor(
        private readonly prefix: string,
        private readonly index: string,
        private readonly mapper: StateStoreMapper<TEntity>,
    ) {
    }

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
        entity: TEntity,
    ): Promise<void> {
        const key = `${this.prefix}${entity.id.value}`;

        await this.client.set(
            key,
            JSON.stringify(this.mapper.toPersistence(entity))
        );

        await this.client.sadd(
            this.index,
            entity.id.value,
        );
    }

    async get(
        id: Id,
    ): Promise<TEntity | null> {
        const data = await this.client.get(
            `${this.prefix}${id.value}`,
        );

        if (!data) {
            return null;
        }

        return this.mapper.toDomain(JSON.parse(data));
    }

    async drop(
        id: Id,
    ): Promise<void> {
        await this.client.del(
            `${this.prefix}${id.value}`,
        );

        await this.client.srem(
            this.index,
            id.value,
        );
    }

    async loadAll(): Promise<TEntity[]> {
        const ids = await this.client.smembers(
            this.index,
        );

        if (!ids.length) {
            return [];
        }

        const keys = ids.map(
            id => `${this.prefix}${id}`,
        );

        const values = await this.client.mget(keys);

        return values
            .filter(
                (value): value is string => value !== null,
            )
            .map(
                value => this.mapper.toDomain(JSON.parse(value)),
            );
    }
}

export default StateStore;
