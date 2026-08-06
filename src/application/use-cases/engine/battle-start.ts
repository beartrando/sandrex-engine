import BattleEntity from "../../../domain/entities/battle.entity";
import Id from "../../../domain/value-objects/id.vo";
import PlayerIds from "../../../domain/value-objects/player-ids.vo";

export class BattleStartUseCase {
    constructor(
        // private readonly battleRepository: BattleRepository,
        // private readonly jobService: JobService,
        // private readonly battleStartedTopik: string,
    ) {
    }

    async execute(battle: BattleEntity): Promise<BattleEntity> {
        return battle.start();
    }
}


export default BattleStartUseCase;

