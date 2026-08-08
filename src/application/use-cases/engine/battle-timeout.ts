import BattleEntity from "../../../domain/entities/battle.entity";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import JobService from "../../../infrastructure/job/service";

export class BattleTimeoutUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
        private readonly jobService: JobService,
    ) {
    }

    async execute(battle: BattleEntity): Promise<void> {
        // await battle.leave(battleLeave);
        await this.battleStateStore.drop(battle.id);
    }
}


export default BattleTimeoutUseCase;

