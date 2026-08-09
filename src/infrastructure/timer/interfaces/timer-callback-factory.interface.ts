import TimerCallback from "./timer-callback.interface";
import Id from "../../../domain/value-objects/id.vo";
import TimerKey from "../value-objects/timer-key.vo";

export interface TimerCallbackFactoryInterface<TEntity extends { id: Id }> {
    createKey(entity: TEntity): TimerKey;

    registryKey(): string;

    create(entity: TEntity): TimerCallback;
}

export default TimerCallbackFactoryInterface;
