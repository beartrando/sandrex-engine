import Id from "../../../domain/value-objects/id.vo";
import Redis from "ioredis";

export default interface CacheStoreInterface<TEntity extends { id: Id }> {
    setClient(client: Redis): void;

    set(entity: TEntity): Promise<void>;

    get(id: Id): Promise<TEntity | null>;

    invalidate(id: Id): Promise<void>;

    exists(id: Id): Promise<boolean>;

    loadAll(): Promise<TEntity[]>;

    clear(): Promise<void>;
}

export default CacheStoreInterface;
