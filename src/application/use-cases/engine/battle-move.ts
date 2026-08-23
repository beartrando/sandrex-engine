import BattleEntity from "../../../domain/battle/battle.entity";
import BattleMove from "../../../domain/battle/value-objects/battle-move.vo";
import BattleDomain from "../../../domain/battle/battle.domain";

export class BattleMoveUseCase {
    constructor() {
    }

    execute(battle: BattleEntity, move: BattleMove): BattleEntity {
        const battleDomain = BattleDomain.of(battle);
        return battleDomain.move(move);
    }
}


export default BattleMoveUseCase;

