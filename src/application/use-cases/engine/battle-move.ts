import BattleEntity from "../../../domain/entities/battle/battle.entity";
import BattleMove from "../../../domain/value-objects/battle-move.vo";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import TimerCallbackFactoryRegistry from "../../../infrastructure/timer/callback-factory-registry";

export class BattleMoveUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
        private readonly timerService: TimerService,
        private readonly timerCallbackFactoryRegistry: TimerCallbackFactoryRegistry,
        private readonly jobService: JobService,
    ) {
    }

    async execute(move: BattleMove): Promise<BattleEntity|null> {
        const battle = await this.battleStateStore.get(move.battleId);
        if (!battle) {
            return null;
        }
        await battle.move(move);
        await this.battleStateStore.save(battle);
        return battle;
    }
}


export default BattleMoveUseCase;

