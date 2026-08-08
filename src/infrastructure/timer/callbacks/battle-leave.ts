import TimerCallback from "../interfaces/timer-callback.interface";

export class BattleLeaveCallbackFactory {

    private readonly event = 'leave';

    constructor(
        private readonly battleTimeoutUseCase: BattleTimeoutUseCase,
    ) {
    }

    createKey(battle: BattleEntity): TimerKey {
        return TimerKey.create(battle, this.event);
    }

    create(battle: BattleEntity): TimerCallback {
        return async () => {
            await this.battleTimeoutUseCase.execute(battle);
        };
    }
}

export default BattleLeaveCallbackFactory;
