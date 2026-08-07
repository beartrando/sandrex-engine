import Id from "../../../domain/value-objects/id.vo";
import Redis from "ioredis";

export interface StateStore<T> {
    save(entity: T): Promise<void>;
    get(id: Id): Promise<T | null>;
    drop(id: Id): Promise<void>;
    loadAll(): Promise<T[]>;
    setClient(client: Redis);
}

export default StateStore;