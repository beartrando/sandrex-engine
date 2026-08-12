import BattleEntity from "../../../domain/battle/battle.entity";
import CachedIdStateStoreInterface from "../../../infrastructure/state-store/interfaces/cached-id-state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import BattleDomain from "../../../domain/battle/battle.domain";
import BattleTimeoutCallbackFactory from "../../../infrastructure/timer/callbacks/battle-timeout-callback-factory";
import TimerCallbackFactoryRegistry from "../../../infrastructure/timer/callback-factory-registry";
import BattleLeave from "../../../domain/battle/value-objects/battle-leave.vo";

export class BattleLeaveUseCase {
    constructor(
        private readonly battleStateStore: CachedIdStateStoreInterface<BattleEntity>,
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

        const battleDomain = BattleDomain.of(battle);
        battleDomain.leave(battleLeave);
        await this.battleStateStore.delete(battle.id);
        this.timerService.stop(BattleTimeoutCallbackFactory.name, battleDomain);
        this.jobService.enqueue(this.topicBattleUpdated, battle);
    }
}


export default BattleLeaveUseCase;

