import Id from "../../../domain/value-objects/id.vo";

export interface StateStore<T> {
    save(entity: T): Promise<void>;
    get(id: Id): Promise<T | null>;
    drop(id: Id): Promise<void>;
    restoreAll(): Promise<T[]>;
}

export default StateStore;