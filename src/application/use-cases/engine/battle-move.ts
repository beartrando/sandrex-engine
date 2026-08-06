import BattleEntity from "../../../domain/entities/battle.entity";
import Id from "../../../domain/value-objects/id.vo";
import PlayerIds from "../../../domain/value-objects/battle/player-ids.vo";
import BattleMove from "../../../domain/value-objects/battle-move.vo";

export class BattleMoveUseCase {
    constructor(
        // private readonly battleRepository: BattleRepository,
        // private readonly jobService: JobService,
        // private readonly battleStartedTopik: string,
    ) {
    }

    async execute(move: BattleMove): Promise<BattleEntity> {
        return BattleEntity.create({playerIds: new PlayerIds([new Id('1')])});
    }
}


export default BattleMoveUseCase;

