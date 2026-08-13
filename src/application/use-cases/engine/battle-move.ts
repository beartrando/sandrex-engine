import BattleEntity from "../../../domain/battle/battle.entity";
import CachedIdStateStoreInterface
    from "../../../infrastructure/state-store/interfaces/cached-id-state-store.interface";
import JobService from "../../../infrastructure/job/service";
import TimerService from "../../../infrastructure/timer/service";
import BattleMove from "../../../domain/battle/value-objects/battle-move.vo";
import TimerKey from "../../../infrastructure/timer/value-objects/timer-key.vo";

export class BattleMoveUseCase {
    constructor(
        private readonly battleStateStore: CachedIdStateStoreInterface<BattleEntity>,
        private readonly timerService: TimerService<TimerKey, BattleEntity>,
        private readonly jobService: JobService,
        private readonly topicBattleUpdated: string,
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
            TimerKey.create(battle),
            battle
        );
        return battle;
    }
}


export default BattleMoveUseCase;

