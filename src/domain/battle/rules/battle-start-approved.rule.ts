import BattleEntity from "../battle.entity";
import logger from "@shared/logger";

export class BattleStartApprovedRule {
    calculate(entity: BattleEntity): boolean {
        // logger.log(entity.playerIds);
        // logger.log(entity.approvals);
        return entity.playerIds.value.every(
            profileId => entity.approvals.isApproved(profileId),
        );
    }
}

export default BattleStartApprovedRule;
