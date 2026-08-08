import BattleEntity from "../../../domain/entities/battle.entity";
import BattleMove from "../../../domain/value-objects/battle-move.vo";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import JobService from "../../../infrastructure/job/service";

export class BattleMoveUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
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

