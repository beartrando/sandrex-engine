import Id from "../../../domain/common/value-objects/id.vo";

export interface CachedIdStateStoreInterface<TEntity extends { id: Id }> {
    .set(entity: TEntity): Promise<void>;

    get(id: Id): Promise<TEntity | null>;

    delete(id: Id): Promise<void>;

    clear(): Promise<void>;

    restore(): Promise<TEntity[]>;
}

export default CachedIdStateStoreInterface;
