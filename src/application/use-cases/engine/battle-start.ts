import BattleEntity from "../../../domain/entities/battle/battle.entity";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import TimerCallbackFactoryRegistry from "../../../infrastructure/timer/callback-factory-registry";

export class BattleStartUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
        private readonly timerService: TimerService,
        private readonly timerCallbackFactoryRegistry: TimerCallbackFactoryRegistry,
        private readonly jobService: JobService,
    ) {
    }

    async execute(battle: BattleEntity): Promise<BattleEntity> {
        battle.start();
        await this.battleStateStore.save(battle);
        return battle;
    }
}


export default BattleStartUseCase;

