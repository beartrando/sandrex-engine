import BattleEntity from "../../../domain/battle/battle.entity";
import CachedIdStateStoreInterface
    from "../../../infrastructure/state-store/interfaces/cached-id-state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import BattleDomain from "../../../domain/battle/battle.domain";
import BattleTimeoutCallbackFactory from "../../../infrastructure/timer/callbacks/battle-timeout-callback-factory";
import BattleLeave from "../../../domain/battle/value-objects/battle-leave.vo";
import Id from "../../../domain/common/value-objects/id.vo";
import TimerKey from "../../../infrastructure/timer/value-objects/timer-key.vo";

export class BattleTimeoutUseCase {
    constructor(
        private readonly battleStateStore: CachedIdStateStoreInterface<BattleEntity>,
        private readonly timerService: TimerService<TimerKey, BattleEntity>,
        private readonly jobService: JobService,
        private readonly topicBattleUpdated: string,
    ) {
    }

    async execute(battleId: Id): Promise<void> {
        const battle = await this.battleStateStore.get(battleId);

        if (!battle) {
            return;
        }
        const battleDomain = BattleDomain.of(battle);
        const profileId = battleDomain.turn();
        const battleLeave = BattleLeave.create({battleId: battle.id, profileId})
        battleDomain.leave(battleLeave);
        await this.battleStateStore.delete(battle.id);
        this.timerService.stop(TimerKey.create(battle));
        this.jobService.enqueue(this.topicBattleUpdated, battle);
    }
}


export default BattleTimeoutUseCase;

