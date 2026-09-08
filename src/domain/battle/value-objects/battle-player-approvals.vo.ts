import ProfileId from "../../profile/value-objects/profile-id.vo";

export type BattlePlayerApprovalsProps = Map<ProfileId, boolean>;

export class BattlePlayerApprovals {
    constructor(
        private readonly approvals: BattlePlayerApprovalsProps,
    ) {
    }

    approve(profileId: ProfileId): BattlePlayerApprovals {
        this.approvals.set(profileId, true);

        return this;
    }

    isApproved(profileId: ProfileId): boolean {
        return this.approvals.get(profileId) ?? false;
    }

    allApproved(): boolean {
        return [...this.approvals.values()].every(Boolean);
    }
}

export default BattlePlayerApprovals;
