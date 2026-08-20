import BattleDomain from "../../../domain/battle/battle.domain";
import BattleLeave from "../../../domain/battle/value-objects/battle-leave.vo";
import BattleEntity from "../../../domain/battle/battle.entity";

export class BattleLeaveUseCase {
    constructor() {
    }

    execute(battle: BattleEntity, battleLeave: BattleLeave): BattleEntity {
        const battleDomain = BattleDomain.of(battle);
        return battleDomain.leave(battleLeave);
    }
}


export default BattleLeaveUseCase;

