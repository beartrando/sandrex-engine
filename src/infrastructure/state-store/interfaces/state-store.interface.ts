import Id from "../../../domain/value-objects/id.vo";
import Redis from "ioredis";

export default interface StateStoreInterface<TEntity extends { id: Id }> {
    setClient(client: Redis): void;

    save(entity: TEntity): Promise<void>;

    get(id: Id): Promise<TEntity | null>;

    drop(id: Id): Promise<void>;

    loadAll(): Promise<TEntity[]>;
}

export default StateStoreInterface;
