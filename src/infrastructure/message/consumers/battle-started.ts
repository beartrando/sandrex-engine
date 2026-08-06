import {BattleObject} from "../../../contracts/proto/battle";
import BattleStartUseCase from "../../../application/use-cases/engine/battle-start";

export class BattleStartedConsumer {
    constructor(
        private readonly updateUseCase: BattleStartUseCase,
    ) {
    }

    async execute(topic: string, partition: number, message: BattleObject): Promise<void> {
        // try {
        //     // logger.log('battleUpdated');
        //     // logger.log(message);
        //     await this.updateUseCase(message);
        //     await BattleModel.updateBattle(message as BattleObject);
        // } catch (error) {
        //     logger.error(`[Kafka] Failed to process message`, {
        //         rawValue: message.userId,
        //         error,
        //     });
        // }
    }

}

export default BattleStartedConsumer;

