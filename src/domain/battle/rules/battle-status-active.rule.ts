import BattleEntity from "../battle.entity";
import BattleStatusEnum from "../enums/battle-status.enum";

export class BattleStatusActiveRule {
    calculate(entity: BattleEntity): boolean {
        return entity.status.value == BattleStatusEnum.Active;
    }
}

export default BattleStatusActiveRule;
