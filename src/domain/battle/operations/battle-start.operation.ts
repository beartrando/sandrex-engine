import BattleEntity from "../battle.entity";
import BattleStatusEnum from "../enums/battle-status.enum";
import BattleStatus from "../value-objects/battle-status.vo";
import BattleStart from "../value-objects/battle-start.vo";
import BattleApprovedRule from "../rules/battle-approved.rule";
import BattleStatusReadyRule from "../rules/battle-status-ready.rule";
import logger from "@shared/logger";

export class BattleStartOperation {
    constructor(
        private readonly statusReadyRule: BattleStatusReadyRule,
        private readonly approvedRule: BattleApprovedRule,
    ) {
    }

    execute(
        battleEntity: BattleEntity,
        battleStart: BattleStart,
    ): BattleEntity {

        if (!this.statusReadyRule.calculate(battleEntity)) {
            logger.log(battleEntity)
            throw new Error("Cannot start battle: battle is not ready");
        }

        battleEntity.approvals.approve(battleStart.profileId);
        if (this.approvedRule.calculate(battleEntity)) {
            return battleEntity.start();
        }

        return battleEntity;

    }
}

export default BattleStartOperation;

