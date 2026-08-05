import BattleRepository from "../../../domain/repositories/battle.repository";
import BattleEntity from "../../../domain/entities/battle.entity";
import Id from "../../../domain/value-objects/id.vo";
import JobService from "../../../infrastructure/job/service";
import {NotFoundError} from "@shared/errors";
import playerIds from "../../../domain/value-objects/player-ids.vo";

export class BattleStartedUseCase {
    constructor(
        private readonly battleRepository: BattleRepository,
        // private readonly jobService: JobService,
        // private readonly battleStartedTopik: string,
    ) {
    }

    async execute(): Promise<BattleEntity> {
        return BattleEntity.create(new playerIds(['1']));
    }
}


export default BattleStartedUseCase;

