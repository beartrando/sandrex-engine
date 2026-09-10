import BattleEntity from "../battle.entity";
import BattleBoard from "../value-objects/battle-board.vo";
import BattleStatusReadyRule from "../rules/battle-status-ready.rule";
import BattleStatusEnum from "../enums/battle-status.enum";
import BattleStatus from "../value-objects/battle-status.vo";

export class BattleInitOperation {
    constructor(
        private readonly statusReadyRule: BattleStatusReadyRule,
    ) {
    }

    execute(
        entity: BattleEntity,
    ): BattleEntity {

        if (!this.statusReadyRule.calculate(entity)) {
            throw new Error("Cannot init battle: battle is not ready");
        }

        // logger.log('New engine started', engine)
        entity.board = BattleBoard.empty();
        entity.status = new BattleStatus(BattleStatusEnum.Ready);
        entity.winnerId = null;

        return entity;

    }
}

export default BattleInitOperation;

