import Id from "../../domain/value-objects/id.vo";

import StateStoreInterface from "./interfaces/state-store.interface";
import CacheStore from "../cache/cache-store";

export class StateStore<TEntity extends { id: Id }> implements StateStoreInterface<TEntity> {

    private _registry: Record<Id, TEntity>;

    constructor(
        private readonly cacheStore: CacheStore<TEntity>,
    ) {
    }

    async save(
        entity: TEntity,
    ): Promise<void> {
    }

    async get(
        id: Id,
    ): Promise<TEntity | null> {
    }

    async drop(
        id: Id,
    ): Promise<void> {
    }

    async loadAll(): Promise<TEntity[]> {
    }
}

export default StateStore;
