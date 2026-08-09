import BattleEntity from "../../../domain/battle/battle.entity";
import BattleLeave from "../../../domain/value-objects/battle-leave.vo";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import BattleDomain from "../../../domain/battle/battle.domain";
import BattleTimeoutCallbackFactory from "../../../infrastructure/timer/callbacks/battle-timeout-callback-factory";
import TimerCallbackFactoryRegistry from "../../../infrastructure/timer/callback-factory-registry";

export class BattleLeaveUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
        private readonly timerService: TimerService,
        private readonly timerCallbackFactoryRegistry: TimerCallbackFactoryRegistry,
        private readonly jobService: JobService,
        private readonly topicBattleUpdated: string,
    ) {
    }

    async execute(battleLeave: BattleLeave): Promise<void> {
        const battle = await this.battleStateStore.get(battleLeave.battleId);
        if (!battle) {
            return;
        }

        const battleDomain = BattleDomain.of(battle);
        battleDomain.leave(battleLeave);
        await this.battleStateStore.drop(battle.id);
        this.timerService.stop(
            this.timerCallbackFactoryRegistry.get(BattleTimeoutCallbackFactory.name).createKey(battle)
        );
        this.jobService.enqueue(this.topicBattleUpdated, battle);
    }
}


export default BattleLeaveUseCase;

