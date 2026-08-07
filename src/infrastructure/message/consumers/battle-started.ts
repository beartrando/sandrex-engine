import {BattleObject} from "../../../contracts/proto/battle";
import BattleStartUseCase from "../../../application/use-cases/engine/battle-start";
import BattleProtoMapper from "../../grpc/mappers/battle.proto.mapper";

export class BattleStartedConsumer {
    constructor(
        private readonly battleStartUseCase: BattleStartUseCase,
    ) {
    }

    async execute(topic: string, partition: number, message: BattleObject): Promise<void> {
        try {
            // logger.log('battleUpdated');
            // logger.log(message);
            const battle = BattleProtoMapper.toDomain(message);
            await this.battleStartUseCase.execute(battle);
        } catch (error) {
            logger.error(`[Kafka] Failed to process message`, {
                rawValue: message.userId,
                error,
            });
        }
    }

}

export default BattleStartedConsumer;

