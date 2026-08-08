import TimerKey from "./timer-key.vo";
import TimerCallback from "./timer-callback.interface";
import Id from "../../../domain/value-objects/id.vo";

export interface TimerCallbackFactoryInterface<TEntity extends { id: Id }> {
    createKey(entity: TEntity): TimerKey;

    create(entity: TEntity): TimerCallback;
}

export default TimerCallbackFactoryInterface;
