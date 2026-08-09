import BattleEntity from "../../../domain/battle/battle.entity";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import BattleDomain from "../../../domain/battle/battle.domain";
import BattleTimeoutCallbackFactory from "../../../infrastructure/timer/callbacks/battle-timeout-callback-factory";
import BattleLeave from "../../../domain/battle/value-objects/battle-leave.vo";
import TimerCallbackFactoryRegistry from "../../../infrastructure/timer/callback-factory-registry";
import Id from "../../../domain/common/value-objects/id.vo";

export class BattleTimeoutUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
        private readonly timerService: TimerService,
        private readonly timerCallbackFactoryRegistry: TimerCallbackFactoryRegistry,
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
        await this.battleStateStore.drop(battle.id);
        this.timerService.stop(
            this.timerCallbackFactoryRegistry.get(BattleTimeoutCallbackFactory.name).createKey(battle)
        );
        this.jobService.enqueue(this.topicBattleUpdated, battle);
    }
}


export default BattleTimeoutUseCase;

