import TimerCallbackFactoryInterface from "./interfaces/timer-callback-factory.interface";
import TimerCallbackFactoryRegistryInterface from "./interfaces/timer-callback-factory-registry.interface";

export class TimerCallbackFactoryRegistry implements TimerCallbackFactoryRegistryInterface {
    private readonly factories = new Map<string, TimerCallbackFactoryInterface<any>>();

    register(factory: TimerCallbackFactoryInterface<any>): void {
        const key = factory.registryKey();
        if (this.factories.has(key)) {
            throw new Error(`Timer callback factory "${key}" is already registered`,);
        }
        this.factories.set(key, factory);
    }

    get(key: string,): TimerCallbackFactoryInterface<any> {
        const factory = this.factories.get(key);
        if (!factory) {
            throw new Error(`Timer callback factory "${key}" is not registered`,);
        }
        return factory;
    }
}

export default TimerCallbackFactoryRegistry;
