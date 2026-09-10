import BattleEntity from "../battle.entity";
import BattleStatusEnum from "../enums/battle-status.enum";
import BattleStatus from "../value-objects/battle-status.vo";
import logger from "@shared/logger";

export class BattleStatusReadyRule {
    calculate(entity: BattleEntity): boolean {
        logger.log(BattleStatus.create(BattleStatusEnum.Ready));
        logger.log(entity.status);
        logger.log('------------------------------------------------------------------------------------------------------');

        return entity.status.equals(BattleStatus.create(BattleStatusEnum.Ready));
    }
}

export default BattleStatusReadyRule;
