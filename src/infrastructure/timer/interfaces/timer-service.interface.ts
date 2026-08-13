import TimerKey from "../value-objects/timer-key.vo";
import TimerCallbackInterface from "./timer-callback.interface";

export interface TimerServiceInterface<KEntity, TEntity> {
    start(
        key: KEntity,
        entity: TEntity,
        timeoutMs?: number,
    ): void;

    stop(
        key: KEntity,
    ): void;

    restart(
        key: KEntity,
        entity: TEntity,
        timeoutMs?: number,
    ): void;
}

export default TimerServiceInterface;
