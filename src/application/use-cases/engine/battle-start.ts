import BattleEntity from "../../../domain/entities/battle.entity";

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

