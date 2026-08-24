import Id from "../../../domain/common/value-objects/id.vo";
import CachedIdStateStoreInterface from "../interfaces/cached-id-state-store.interface";
import CacheStore from "../../cache/cache-store";

export class CachedIdStateStore<
    TEntity extends { id: Id<any> },
> implements CachedIdStateStoreInterface<TEntity> {
    private readonly _registry = new Map<string, TEntity>();

    constructor(
        private readonly cacheStore: CacheStore<TEntity>,
    ) {
    }

    async set(
        entity: TEntity,
    ): Promise<void> {
        this._registry.set(
            entity.id.value,
            entity,
        );

        await this.cacheStore.set(entity);
    }

    async get(id: TEntity["id"]): Promise<TEntity | null> {
        return this._registry.get(id.value) ?? null;
    }

    async delete(id: TEntity["id"]): Promise<void> {
        this._registry.delete(id.value);

        await this.cacheStore.invalidate(id);
    }

    async clear(): Promise<void> {
        this._registry.clear();

        await this.cacheStore.clear();
    }

    async restore(): Promise<TEntity[]> {
        const entities = await this.cacheStore.loadAll();

        // this._registry.clear();

        for (const entity of entities) {
            this._registry.set(
                entity.id.value,
                entity,
            );
        }

        return entities;
    }
}

export default CachedIdStateStore;
