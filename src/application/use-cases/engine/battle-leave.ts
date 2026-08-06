import BattleEntity from "../../../domain/entities/battle.entity";
import Id from "../../../domain/value-objects/id.vo";
import PlayerIds from "../../../domain/value-objects/battle/player-ids.vo";
import BattleLeave from "../../../domain/value-objects/battle-leave.vo";

export class BattleLeaveUseCase {
    constructor(
        // private readonly battleRepository: BattleRepository,
        // private readonly jobService: JobService,
        // private readonly battleStartedTopik: string,
    ) {
    }

    async execute(battleLeave: BattleLeave): Promise<BattleEntity> {
        return BattleEntity.create({playerIds: new PlayerIds([new Id('1')])});
    }
}


export default BattleLeaveUseCase;

