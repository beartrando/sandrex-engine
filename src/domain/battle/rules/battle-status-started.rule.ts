import BattleEntity from "../battle.entity";
import BattleStatusEnum from "../enums/battle-status.enum";
import BattleStatus from "../value-objects/battle-status.vo";

export class BattleStatusStartedRule {
    calculate(entity: BattleEntity): boolean {
        return entity.status?.equals(BattleStatus.create(BattleStatusEnum.Started));
    }
}

export default BattleStatusStartedRule;
