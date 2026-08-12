import BattleEntity from "../../../domain/battle/battle.entity";
import CachedIdStateStoreInterface from "../../../infrastructure/state-store/interfaces/cached-id-state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import BattleDomain from "../../../domain/battle/battle.domain";
import BattleTimeoutCallbackFactory from "../../../infrastructure/timer/callbacks/battle-timeout-callback-factory";
import TimerCallbackFactoryRegistry from "../../../infrastructure/timer/callback-factory-holder";

export class BattleStartUseCase {
    constructor(
        private readonly battleStateStore: CachedIdStateStoreInterface<BattleEntity>,
        private readonly timerService: TimerService,
        private readonly jobService: JobService,
        private readonly topicBattleStarted: string,
        private readonly battleTurnTimeLimit: number,
    ) {
    }

    async execute(battle: BattleEntity): Promise<BattleEntity> {
        const battleDomain = BattleDomain.of(battle);
        battleDomain.start();
        await this.battleStateStore.set(battle);
        const callbackFactory = this.timerService.callbackFactoryRegistry.get(BattleTimeoutCallbackFactory.name);
        this.timerService.restart(
            BattleTimeoutCallbackFactory.name,
            this.battleTurnTimeLimit,
            battle
        );
        this.jobService.enqueue(this.topicBattleStarted, battle);
        return battle;
    }
}


export default BattleStartUseCase;

