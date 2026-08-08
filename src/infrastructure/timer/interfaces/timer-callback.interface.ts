export interface TimerCallback {
    (): void | Promise<void>;
}

export default TimerCallback;
