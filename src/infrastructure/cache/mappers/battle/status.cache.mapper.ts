import BattleStatus from "../../../../domain/battle/value-objects/battle-status.vo";
import BattleStatusEnum from "../../../../domain/battle/enums/battle-status.enum";

export class StatusCacheMapper {

    static toPersistence(status: BattleStatus): string {
        return status.value;
    }

    static toDomain(status: string): BattleStatus {
        switch (status) {
            case BattleStatusEnum.Created:
                return new BattleStatus(BattleStatusEnum.Created);
            case BattleStatusEnum.Ready:
                return new BattleStatus(BattleStatusEnum.Ready);
            case BattleStatusEnum.Active:
                return new BattleStatus(BattleStatusEnum.Active);
            case BattleStatusEnum.Finished:
                return new BattleStatus(BattleStatusEnum.Finished);
            default:
                return new BattleStatus(BattleStatusEnum.Unknown);
        }
    }
}

export default StatusCacheMapper;
