import TimerCallbackFactory from "../callbacks/timer-callback-factory";

export interface TimerCallbackFactoryHolderInterface<TEntity> {
    set(factory: TimerCallbackFactory<TEntity>): void;

    get(): TimerCallbackFactory<TEntity>;
}

export default TimerCallbackFactoryHolderInterface;
