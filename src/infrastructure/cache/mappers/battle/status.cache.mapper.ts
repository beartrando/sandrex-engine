import BattleStatus from "../../../../domain/battle/value-objects/battle-status.vo";
import BattleStatusEnum from "../../../../domain/battle/enums/battle-status.enum";

export class StatusCacheMapper {

    static toPersistence(status: BattleStatus): string {
        return status.value;
    }

    static toDomain(status: string): BattleStatus {
        switch (status) {
            case BattleStatusEnum.New:
                return new BattleStatus(BattleStatusEnum.New);
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
