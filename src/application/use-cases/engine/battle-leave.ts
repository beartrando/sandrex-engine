import BattleEntity from "../../../domain/entities/battle/battle.entity";
import BattleLeave from "../../../domain/value-objects/battle-leave.vo";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import BattleDomain from "../../../domain/battle/battle.domain";
import BattleTimeoutCallbackFactory from "../../../infrastructure/timer/callbacks/battle-timeout-callback-factory";

export class BattleLeaveUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
        private readonly timerService: TimerService,
        private readonly jobService: JobService,
        private readonly topicBattleUpdated: string,
    ) {
    }

    async execute(battleLeave: BattleLeave): Promise<void> {
        const battle = await this.battleStateStore.get(battleLeave.battleId);
        if (!battle) {
            return;
        }

        BattleDomain.of(battle).leave(battleLeave);
        await this.battleStateStore.drop(battle.id);
        this.timerService.stop(BattleTimeoutCallbackFactory.createKey(battle));
        this.jobService.enqueue(this.topicBattleUpdated, battle);
    }
}


export default BattleLeaveUseCase;

