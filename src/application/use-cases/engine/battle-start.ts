import BattleEntity from "../../../domain/battle/battle.entity";
import CachedIdStateStoreInterface
    from "../../../infrastructure/state-store/interfaces/cached-id-state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import BattleDomain from "../../../domain/battle/battle.domain";
import TimerKey from "../../../infrastructure/timer/value-objects/timer-key.vo";

export class BattleStartUseCase {
    constructor(
        private readonly battleStateStore: CachedIdStateStoreInterface<BattleEntity>,
        private readonly timerService: TimerService<TimerKey, BattleEntity>,
        private readonly jobService: JobService,
        private readonly topicBattleStarted: string,
    ) {
    }

    async execute(battle: BattleEntity): Promise<BattleEntity> {
        const battleDomain = BattleDomain.of(battle);
        battleDomain.start();
        await this.battleStateStore.set(battle);
        this.timerService.restart(
            TimerKey.create(battle),
            battle
        );
        this.jobService.enqueue(this.topicBattleStarted, battle);
        return battle;
    }
}


export default BattleStartUseCase;

