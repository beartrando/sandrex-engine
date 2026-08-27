import BattleEntity from "../battle.entity";
import BattleBoard from "../value-objects/battle-board.vo";
import BattleStatusReadyRule from "../rules/battle-status-ready.rule";
import BattleStatusEnum from "../enums/battle-status.enum";
import BattleStatus from "../value-objects/battle-status.vo";

export class BattleStartOperation {
    constructor(
        private readonly statusReadyRule: BattleStatusReadyRule,
    ) {
    }

    execute(
        entity: BattleEntity,
    ): BattleEntity {

        if (!this.statusReadyRule.calculate(entity)) {
            throw new Error("Cannot start battle: battle is not active");
        }

        // logger.log('New engine started', engine)
        entity.board = BattleBoard.empty();
        entity.status = new BattleStatus(BattleStatusEnum.Active);
        entity.winnerId = null;

        return entity;

    }
}

export default BattleStartOperation;

