import BattleEntity from "../../../domain/battle/battle.entity";
import BattleMove from "../../../domain/battle/value-objects/battle-move.vo";

export class BattleMoveUseCase {
    constructor() {
    }

    execute(battle: BattleEntity, move: BattleMove): BattleEntity {
        battle.move(move);
        return battle;
    }
}


export default BattleMoveUseCase;

