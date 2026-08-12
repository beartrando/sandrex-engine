import TimerCallbackFactoryHolderInterface from "./interfaces/timer-callback-factory-holder.interface";
import TimerCallbackFactoryInterface from "./interfaces/timer-callback-factory.interface";

export class TimerCallbackFactoryHolder implements TimerCallbackFactoryHolderInterface<TEntity> {
    private _factory: TimerCallbackFactoryInterface<TEntity> | null = null;

    set factory(factory: TimerCallbackFactoryInterface<TEntity>): void {
        if (this._factory) {
            throw new Error("Timer callback factory is already initialized");
        }

        this._factory = factory;
    }

    get(): TimerCallbackFactoryInterface<TEntity> {
        if (!this._factory) {
            throw new Error("Timer callback factory is not initialized");
        }

        return this._factory;
    }
}

export default TimerCallbackFactoryHolder;
