import ProfileId from "../../profile/value-objects/profile-id.vo";
import BattlePlayerIds from "./battle-player-ids.vo";

export type BattlePlayerApprovalsProps = Map<ProfileId, boolean>;

export class BattlePlayerApprovals {
    constructor(
        private readonly approvals: BattlePlayerApprovalsProps,
    ) {
    }

    approve(profileId: ProfileId): BattlePlayerApprovals {
        const existingProfileId = [...this.approvals.keys()].find(
            id => id.equals(profileId),
        );

        if (existingProfileId) {
            this.approvals.set(existingProfileId, true);
        }

        return this;
    }

    isApproved(profileId: ProfileId): boolean {
        return this.approvals.get(profileId) ?? false;
    }

    static empty(playerIds: BattlePlayerIds): BattlePlayerApprovals {
        return new BattlePlayerApprovals(
            new Map(
                playerIds.value.map((profileId: ProfileId) => [profileId, false]),
            ),
        );
    }

}

export default BattlePlayerApprovals;
