import Redis from "ioredis";
import Id from "../../../domain/common/value-objects/id.vo";

export interface CacheStoreInterface<
    TEntity extends { id: Id<any> },
> {
    setClient(client: Redis): void;

    set(entity: TEntity): Promise<void>;

    get(id: TEntity["id"]): Promise<TEntity | null>;

    invalidate(id: TEntity["id"]): Promise<void>;

    exists(id: TEntity["id"]): Promise<boolean>;

    loadAll(): Promise<TEntity[]>;

    clear(): Promise<void>;
}

export default CacheStoreInterface;
