import * as battleProto from "../../../contracts/proto/battle";
import BattleStartUseCase from "../../../application/use-cases/engine/battle-start";
import BattleProtoMapper from "../../grpc/mappers/battle.proto.mapper";
import logger from "@shared/logger";
import UseCaseInterface from "../interfaces/use-case.interface";
import EngineHandler from "../../grpc/handlers/engine.handler";

export class BattleStartedConsumer implements UseCaseInterface<battleProto.BattleObject>{
    constructor(
        private readonly battleStartUseCase: BattleStartUseCase,
        private readonly engineHandler: EngineHandler,
    ) {
    }

    async execute(topic: string, partition: number, message: battleProto.BattleObject): Promise<void> {
        try {
            // logger.log('BattleStartedConsumer');
            // logger.log(message);
            const battle = BattleProtoMapper.toDomain(message);
            await this.battleStartUseCase.execute(battle);
        } catch (error) {
            logger.error(`[Kafka] Failed to process message`, {
                rawValue: message.id,
                error,
            });
        }
    }

}

export default BattleStartedConsumer;

