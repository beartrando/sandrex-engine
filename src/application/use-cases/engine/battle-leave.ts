import BattleEntity from "../../../domain/entities/battle.entity";
import BattleLeave from "../../../domain/value-objects/battle-leave.vo";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import JobService from "../../../infrastructure/job/service";

export class BattleLeaveUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
        private readonly jobService: JobService,
    ) {
    }

    async execute(battleLeave: BattleLeave): Promise<void> {
        const battle = await this.battleStateStore.get(battleLeave.battleId);
        if (!battle) {
            return ;
        }

        await battle.leave(battleLeave);
        await this.battleStateStore.drop(battle.id);
    }
}


export default BattleLeaveUseCase;

