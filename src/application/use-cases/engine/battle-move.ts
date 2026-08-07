import BattleEntity from "../../../domain/entities/battle.entity";
import Id from "../../../domain/value-objects/id.vo";
import PlayerIds from "../../../domain/value-objects/battle/player-ids.vo";
import BattleMove from "../../../domain/value-objects/battle-move.vo";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import MessageService from "../../../infrastructure/message/service";
import JobService from "../../../infrastructure/job/service";

export class BattleMoveUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
        private readonly jobService: JobService,
    ) {
    }

    async execute(move: BattleMove): Promise<BattleEntity> {
        const battle = this.battleStateStore.get(move.battleId);
        await battle.move(move);
        await this.battleStateStore.drop(battle.id);
    }
}


export default BattleMoveUseCase;

