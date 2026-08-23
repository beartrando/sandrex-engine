import TimerCallbackInterface from "../interfaces/timer-callback.interface";
import TimerCallbackFactoryInterface from "../interfaces/timer-callback-factory.interface";
import BattleService from "../../battle/service";
import Id from "../../../domain/common/value-objects/id.vo";

export class BattleTimeoutCallbackFactory implements TimerCallbackFactoryInterface<Id> {

    constructor(
        private readonly battleService: BattleService,
    ) {
    }

    create(battleId: Id): TimerCallbackInterface {
        return async () => {
            await this.battleService.timeout(battleId);
        };
    }
}

export default BattleTimeoutCallbackFactory;
