import BattleEntity from "../../../domain/entities/battle.entity";
import Id from "../../../domain/value-objects/id.vo";
import PlayerIds from "../../../domain/value-objects/battle/player-ids.vo";
import BattleLeave from "../../../domain/value-objects/battle-leave.vo";
import StateStoreInterface from "../../../infrastructure/state-store/interfaces/state-store.interface";
import MessageService from "../../../infrastructure/message/service";
import JobService from "../../../infrastructure/job/service";

export class BattleLeaveUseCase {
    constructor(
        private readonly battleStateStore: StateStoreInterface<BattleEntity>,
        private readonly jobService: JobService,
    ) {
    }

    async execute(battleLeave: BattleLeave): Promise<void> {
        const battle = this.battleStateStore.get(battleLeave.battleId);
        await battle.leave(battleLeave);
        await this.battleStateStore.drop(battle.id);
    }
}


export default BattleLeaveUseCase;

