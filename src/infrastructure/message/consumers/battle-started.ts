import * as battleProto from "../../../contracts/proto/battle";
import BattleProtoMapper from "../../grpc/mappers/battle.proto.mapper";
import logger from "@shared/logger";
import UseCaseInterface from "../interfaces/use-case.interface";
import BattleService from "../../battle/service";

export class BattleStartedConsumer implements UseCaseInterface<battleProto.BattleObject> {
    constructor(
        private readonly battleService: BattleService,
    ) {
    }

    async execute(topic: string, partition: number, message: battleProto.BattleObject): Promise<void> {
        try {
            const battle = BattleProtoMapper.toDomain(message);
            await this.battleService.start(battle);
        } catch (error) {
            logger.error(`[Kafka] Failed to process message`, {
                rawValue: message.id,
                error,
            });
        }
    }

}

export default BattleStartedConsumer;

