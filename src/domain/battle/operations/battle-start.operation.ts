import BattleEntity from "../battle.entity";
import BattleBoard from "../value-objects/battle-board.vo";
import BattleStatusActiveRule from "../rules/battle-status-active.rule";
import BattleStatusEnum from "../enums/battle-status.enum";

export class BattleStartOperation {
    constructor(
        private readonly statusActiveRule: BattleStatusActiveRule,
    ) {
    }

    execute(
        entity: BattleEntity,
    ): BattleEntity {

        if (!this.statusActiveRule.calculate(entity)) {
            throw new Error("Cannot start battle: battle is not active");
        }

        // logger.log('New engine started', engine)
        entity.board = BattleBoard.empty();
        entity.status = BattleStatusEnum.Active;
        entity.winnerId = null;

        return entity;

    }
}

export default BattleStartOperation;

