import BattleEntity from "../../../domain/entities/battle.entity";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import JobService from "../../../infrastructure/job/service";

export class BattleStartUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
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

