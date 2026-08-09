import StatusEnum from "../../enums/battle/status.enum";

export class BattleStatus {
    constructor(
        readonly value: StatusEnum,
    ) {
    }

    equals(other: BattleStatus): boolean {
        return this.value === other.value;
    }
}

export default BattleStatus;
