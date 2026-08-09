import TimerCallback from "../interfaces/timer-callback.interface";
import BattleTimeoutUseCase from "../../../application/use-cases/engine/battle-timeout";
import BattleEntity from "../../../domain/entities/battle/battle.entity";
import {TimerCallbackFactory} from "./timer-callback-factory";

export class BattleTimeoutCallbackFactory extends TimerCallbackFactory<BattleEntity> {

    protected readonly event = "leave";

    constructor(
        private readonly battleTimeoutUseCase: BattleTimeoutUseCase,
    ) {
        super();
    }
}

export default BattleTimeoutCallbackFactory;
