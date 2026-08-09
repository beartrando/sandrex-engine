import Id from "../../../domain/value-objects/id.vo";
import TimerKey from "../value-objects/timer-key.vo";
import TimerCallbackFactoryInterface from "../interfaces/timer-callback-factory.interface";

export abstract class TimerCallbackFactory<TEntity extends {
    id: Id
}> implements TimerCallbackFactoryInterface<TEntity> {
    protected abstract readonly event: string;

    static createKey(entity: TEntity): TimerKey {
        return TimerKey.create(entity, this.event);
    }
}

export default TimerCallbackFactory;
