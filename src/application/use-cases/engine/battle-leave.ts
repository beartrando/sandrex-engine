import BattleEntity from "../../../domain/entities/battle/battle.entity";
import BattleLeave from "../../../domain/value-objects/battle-leave.vo";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import TimerCallbackFactoryInterface from "../../../infrastructure/timer/interfaces/timer-callback-factory.interface";

export class BattleLeaveUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
        private readonly timerService: TimerService,
        private readonly jobService: JobService,
    ) {
    }

    async execute(battleLeave: BattleLeave): Promise<void> {
        const battle = await this.battleStateStore.get(battleLeave.battleId);
        if (!battle) {
            return ;
        }

        await battle.leave(battleLeave);
        await this.battleStateStore.drop(battle.id);





        // battle.leave(batleLeave);
        // const battleLeaveCallbackFactory: TimerCallbackFactoryInterface<BattleEntity> = this.timerService.getFactory(BattleLeaveCallbackFactory.key);
        // const battleLeaveCallbackFactory = this.timerService.stop(battleLeaveCallbackFactory.createKey(battle));
        // await this.battleStateStore.drop(battle.id);
    }
}


export default BattleLeaveUseCase;

