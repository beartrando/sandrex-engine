import BattleEntity from "../../../domain/battle/battle.entity";
import CachedIdStateStoreInterface from "../../../infrastructure/state-store/interfaces/cached-id-state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import TimerCallbackFactoryRegistry from "../../../infrastructure/timer/callback-factory-registry";
import BattleTimeoutCallbackFactory from "../../../infrastructure/timer/callbacks/battle-timeout-callback-factory";
import BattleMove from "../../../domain/battle/value-objects/battle-move.vo";

export class BattleMoveUseCase {
    constructor(
        private readonly battleStateStore: CachedIdStateStoreInterface<BattleEntity>,
        private readonly timerService: TimerService,
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
        await this.battleStateStore.set(battle);
        this.timerService.restart(
            BattleTimeoutCallbackFactory.name,
            this.battleTurnTimeLimit,
            battle
        );
        return battle;
    }
}


export default BattleMoveUseCase;

