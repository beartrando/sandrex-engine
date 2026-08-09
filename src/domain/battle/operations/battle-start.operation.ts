import BattleEntity from "../battle.entity";
import Board from "../value-objects/board.vo";
import StatusEnum from "../enums/status.enum";
import BattleStatus from "../value-objects/status.vo";

export class BattleStartOperation {
    constructor() {
    }

    execute(
        entity: BattleEntity,
    ): BattleEntity {

        // logger.log('New battle started', battle)
        entity.board = Board.empty();
        entity.status = new BattleStatus(StatusEnum.Active);
        entity.winnerId = "";

        return entity;

    }
}

export default BattleStartOperation;

