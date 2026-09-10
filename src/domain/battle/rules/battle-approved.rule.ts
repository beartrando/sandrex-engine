import BattleEntity from "../battle.entity";

export class BattleApprovedRule {
    calculate(entity: BattleEntity): boolean {
        return entity.playerIds.value.every(
            profileId => entity.approvals.isApproved(profileId),
        );
    }
}

export default BattleApprovedRule;
