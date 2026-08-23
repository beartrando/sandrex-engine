import BattleEntity from "../../../domain/battle/battle.entity";
import BattleDomain from "../../../domain/battle/battle.domain";

export class BattleStartUseCase {
    constructor() {
    }

    execute(battle: BattleEntity): BattleEntity {
        const battleDomain = BattleDomain.of(battle);

        return battleDomain.start();
    }
}


export default BattleStartUseCase;

