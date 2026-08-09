import TimerCallbackFactoryInterface from "./timer-callback-factory.interface";

export interface TimerCallbackFactoryRegistryInterface {
    register(factory: TimerCallbackFactoryInterface<any>): void;

    get(key: string,): TimerCallbackFactoryInterface<any>;
}

export default TimerCallbackFactoryRegistryInterface;