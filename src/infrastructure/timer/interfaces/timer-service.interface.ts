import TimerKey from "../value-objects/timer-key.vo";

export interface TimerServiceInterface {
    start(
        key: TimerKey,
        timeoutMs: number,
        callback: () => void | Promise<void>,
    ): void;

    stop(key: TimerKey): void;

    restart(
        key: TimerKey,
        timeoutMs: number,
        callback: () => void | Promise<void>,
    ): void;
}

export default TimerServiceInterface;
