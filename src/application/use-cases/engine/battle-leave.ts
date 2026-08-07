import BattleEntity from "../../../domain/entities/battle.entity";
import Id from "../../../domain/value-objects/id.vo";
import PlayerIds from "../../../domain/value-objects/battle/player-ids.vo";
import BattleLeave from "../../../domain/value-objects/battle-leave.vo";
import StateStore from "../../../infrastructure/state-store/interfaces/state-store";

export class BattleLeaveUseCase {
    constructor(
        private readonly battleStateStore: StateStore<BattleEntity>,
    ) {
    }

    async execute(battleLeave: BattleLeave): Promise<void> {
        // this.battleStateStore.save(battle);
    }
}


export default BattleLeaveUseCase;

