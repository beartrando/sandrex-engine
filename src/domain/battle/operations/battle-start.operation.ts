import BattleEntity from "../battle.entity";
import Board from "../value-objects/board.vo";
import StatusEnum from "../enums/status.enum";
import Status from "../value-objects/status.vo";
import BattleStatusActiveRule from "../rules/battle-status-active.rule";

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
        entity.board = Board.empty();
        entity.winnerId = null;

        return entity;

    }
}

export default BattleStartOperation;

