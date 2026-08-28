import BattleEntity from "./battle.entity";
import BattleMove from "./value-objects/battle-move.vo";
import BattleLeave from "./value-objects/battle-leave.vo";
import BattleId from "./value-objects/battle-id.vo";

import BattleMoveOperation from "./operations/battle-move.operation";
import BattleLeaveOperation from "./operations/battle-leave.operation";

import BattleCellRule from "./rules/battle-cell.rule";
import BattleDrawRule from "./rules/battle-draw.rule";
import BattleTurnRule from "./rules/battle-turn.rule";
import BattleWinRule from "./rules/battle-win.rule";
import BattleStartOperation from "./operations/battle-start.operation";
import BattleStatusReadyRule from "./rules/battle-status-ready.rule";
import logger from "@shared/logger";
import ProfileId from "../profile/value-objects/profile-id.vo";
import BattleStatusEnum from "./enums/battle-status.enum";
import BattleStatus from "./value-objects/battle-status.vo";

const cellRule = new BattleCellRule();
const turnRule = new BattleTurnRule();
const winRule = new BattleWinRule();
const drawRule = new BattleDrawRule();
const statusActiveRule = new BattleStatusReadyRule();

const moveOperation = new BattleMoveOperation(
    cellRule,
    turnRule,
    winRule,
    drawRule,
);

const leaveOperation = new BattleLeaveOperation(
    turnRule,
);

const startOperation = new BattleStartOperation(
    statusActiveRule,
);

export class BattleDomain {
    private constructor(private readonly _entity: BattleEntity) {
    }

    get entity(): BattleEntity {
        return this._entity;
    }

    static of(entity: BattleEntity): BattleDomain {
        return new BattleDomain(entity);
    }

    move(move: BattleMove): BattleEntity {
        return moveOperation.execute(this.entity, move);
    }

    start(): BattleEntity {
        if (this.entity.status.equals(BattleStatus.create(BattleStatusEnum.Ready))) {
            return startOperation.execute(this.entity);
        }
        return this.entity;
    }

    leave(leave: BattleLeave): BattleEntity {
        logger.log(leave);
        return leaveOperation.execute(this.entity, leave);
    }

    turn(): ProfileId {
        return turnRule.calculate(this.entity);
    }
}

export default BattleDomain;
