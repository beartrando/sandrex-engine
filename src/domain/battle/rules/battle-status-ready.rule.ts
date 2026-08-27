import BattleEntity from "../battle.entity";
import BattleStatusEnum from "../enums/battle-status.enum";

export class BattleStatusReadyRule {
    calculate(entity: BattleEntity): boolean {
        return entity.status.value == BattleStatusEnum.Ready;
    }
}

export default BattleStatusReadyRule;
