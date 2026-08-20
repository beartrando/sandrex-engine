import TimerCallbackInterface from "../interfaces/timer-callback.interface";
import BattleEntity from "../../../domain/battle/battle.entity";
import TimerCallbackFactoryInterface from "../interfaces/timer-callback-factory.interface";
import BattleService from "../../battle/service";

export class BattleTimeoutCallbackFactory implements TimerCallbackFactoryInterface<BattleEntity> {

    constructor(
        private readonly battleService: BattleService,
    ) {
    }

    create(entity: BattleEntity): TimerCallbackInterface {
        const battleId = entity.id;

        return async () => {
            await this.battleService.timeout(battleId);
        };
    }
}

export default BattleTimeoutCallbackFactory;
