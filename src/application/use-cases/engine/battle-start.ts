import BattleEntity from "../../../domain/battle/battle.entity";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import BattleDomain from "../../../domain/battle/battle.domain";
import BattleTimeoutCallbackFactory from "../../../infrastructure/timer/callbacks/battle-timeout-callback-factory";
import TimerCallbackFactoryRegistry from "../../../infrastructure/timer/callback-factory-registry";

export class BattleStartUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
        private readonly timerService: TimerService,
        private readonly timerCallbackFactoryRegistry: TimerCallbackFactoryRegistry,
        private readonly jobService: JobService,
        private readonly topicBattleStarted: string,
        private readonly battleTurnTimeLimit: number,
    ) {
    }

    async execute(battle: BattleEntity): Promise<BattleEntity> {
        const battleDomain = BattleDomain.of(battle);
        battleDomain.start();
        await this.battleStateStore.save(battle);
        const callbackFactory = this.timerCallbackFactoryRegistry.get(BattleTimeoutCallbackFactory.name);
        this.timerService.restart(
            callbackFactory.createKey(battle),
            this.battleTurnTimeLimit,
            callbackFactory.create(battle)
        );
        this.jobService.enqueue(this.topicBattleStarted, battle);
        return battle;
    }
}


export default BattleStartUseCase;

