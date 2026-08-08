import TimerCallback from "./interfaces/timer-callback.interface";
import TimerKey from "./value-objects/timer-key.vo";
import TimerCallbackFactoryInterface from "./interfaces/timer-callback-factory.interface";
import TimerServiceInterface from "./interfaces/timer-service.interface";

export class TimerService implements TimerServiceInterface {
    private readonly timers = new Map<TimerKey, NodeJS.Timeout>();
    private readonly factories = new Map<string, TimerCallbackFactoryInterface<any>>();

    registerFactory(
        key: string,
        factory: TimerCallbackFactoryInterface<any>,
    ): void {
        this.factories.set(key, factory);
    }

    getFactory(key: string): TimerCallbackFactoryInterface<any> {
        const factory = this.factories.get(key);

        if (!factory) {
            throw new Error(`Timer callback factory "${key}" is not registered`);
        }

        return factory;
    }

    start(
        key: TimerKey,
        timeoutMs: number,
        callback: TimerCallback,
    ): void {
        this.stop(key);

        const timer = setTimeout(async () => {
            this.timers.delete(key);
            await callback();
        }, timeoutMs);

        this.timers.set(key, timer);
    }

    stop(key: TimerKey): void {
        const timer = this.timers.get(key);

        if (!timer) {
            return;
        }

        clearTimeout(timer);
        this.timers.delete(key);
    }

    restart(
        key: TimerKey,
        timeoutMs: number,
        callback: () => void | Promise<void>,
    ): void {
        this.start(key, timeoutMs, callback);
    }
}

export default TimerService;