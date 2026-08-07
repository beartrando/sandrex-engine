import BattleEntity from "../../../domain/entities/battle.entity";
import StateStoreService from "../../../infrastructure/state-store/service";
import stateStoreConfig, {stateStoresList} from "../../../infrastructure/state-store/config";

export class BattleStartUseCase {
    constructor(
        private readonly stateStoreService: StateStoreService,
        private readonly stateStoresList: StateStoreService,
        // private readonly jobService: JobService,
        // private readonly battleStartedTopik: string,
    ) {
    }

    async execute(battle: BattleEntity): Promise<BattleEntity> {
        battle.start();
        stateStoreService.save(stateStoreConfig.battle, battle);
    }
}


export default BattleStartUseCase;

