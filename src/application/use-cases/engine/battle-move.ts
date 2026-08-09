import BattleEntity from "../../../domain/battle/battle.entity";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import TimerCallbackFactoryRegistry from "../../../infrastructure/timer/callback-factory-registry";
import BattleTimeoutCallbackFactory from "../../../infrastructure/timer/callbacks/battle-timeout-callback-factory";
import BattleMove from "../../../domain/battle/value-objects/battle-move.vo";

export class BattleMoveUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
        private readonly timerService: TimerService,
        private readonly timerCallbackFactoryRegistry: TimerCallbackFactoryRegistry,
        private readonly jobService: JobService,
        private readonly topicBattleUpdated: string,
        private readonly battleTurnTimeLimit: number,
    ) {
    }

    async execute(move: BattleMove): Promise<BattleEntity | null> {
        const battle = await this.battleStateStore.get(move.battleId);
        if (!battle) {
            return null;
        }
        await battle.move(move);
        await this.battleStateStore.save(battle);
        const callbackFActory = this.timerCallbackFactoryRegistry.get(BattleTimeoutCallbackFactory.name);
        this.timerService.restart(
            callbackFActory.createKey(battle),
            this.battleTurnTimeLimit,
            callbackFActory.create(battle)
        );
        return battle;
    }
}


export default BattleMoveUseCase;

