import TimerKey from "./timer-key.vo";

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