import BattleEntity from "../../../domain/entities/battle.entity";
import StateStoreService from "../../../infrastructure/state-store/service";
import BattleStateStore from "../../../infrastructure/state-store/stores/battle-state-store";
import redisConfig from "../../../infrastructure/state-store/config/redis.config";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import MessageService from "../../../infrastructure/message/service";

export class BattleStartUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
        private readonly messageService: MessageService,
    ) {
    }

    async execute(battle: BattleEntity): Promise<void> {
        battle.start();
        this.battleStateStore.save(battle);
    }
}


export default BattleStartUseCase;

