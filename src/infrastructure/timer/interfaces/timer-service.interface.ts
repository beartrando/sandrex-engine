import TimerKey from "../value-objects/timer-key.vo";
import TimerCallback from "./timer-callback.interface";

export interface TimerServiceInterface {
    start(
        key: TimerKey,
        timeoutMs: number,
        callback: TimerCallback,
    ): void;

    stop(key: TimerKey): void;

    restart(
        key: TimerKey,
        timeoutMs: number,
        callback: TimerCallback,
    ): void;
}

export default TimerServiceInterface;
