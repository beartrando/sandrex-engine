import BattleEntity from "../battle.entity";
import CellValueEnum from "../enums/cell-value.enum";
import StatusEnum from "../enums/status.enum";

export class BattleStatusActiveRule {
    calculate(entity: BattleEntity): boolean {
        return entity.status.value == StatusEnum.Active;
    }
}

export default BattleStatusActiveRule;
