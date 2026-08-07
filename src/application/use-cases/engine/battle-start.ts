import BattleEntity from "../../../domain/entities/battle.entity";
import StateStoreService from "../../../infrastructure/state-store/service";
import BattleStateStore from "../../../infrastructure/state-store/stores/battle-state-store";
import stateStoreConfig from "../../../infrastructure/state-store/config/state-store.config";
import StateStore from "../../../infrastructure/state-store/interfaces/state-store";

export class BattleStartUseCase {
    constructor(
        private readonly battleStateStore: StateStore<BattleEntity>,
    ) {
    }

    async execute(battle: BattleEntity): Promise<void> {
        battle.start();
        this.battleStateStore.save(battle);
    }
}


export default BattleStartUseCase;

