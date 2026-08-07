import BattleEntity from "../../../domain/entities/battle.entity";
import Id from "../../../domain/value-objects/id.vo";
import PlayerIds from "../../../domain/value-objects/battle/player-ids.vo";
import BattleMove from "../../../domain/value-objects/battle-move.vo";
import StateStore from "../../../infrastructure/state-store/interfaces/state-store";

export class BattleMoveUseCase {
    constructor(
        private readonly battleStateStore: StateStore<BattleEntity>,
    ) {
    }

    async execute(move: BattleMove): Promise<BattleEntity> {
        // this.battleStateStore.save(battle);
    }
}


export default BattleMoveUseCase;

