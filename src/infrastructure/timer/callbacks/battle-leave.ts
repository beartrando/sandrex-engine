import TimerCallback from "../interfaces/timer-callback.interface";
import TimerCallbackFactoryInterface from "../interfaces/timer-callback-factory.interface";
import BattleLeaveUseCase from "../../../application/use-cases/engine/battle-leave";
import BattleLeave from "../../../domain/value-objects/battle-leave.vo";
import BattleEntity from "../../../domain/entities/battle/battle.entity";
import TimerKey from "../value-objects/timer-key.vo";
import Id from "../../../domain/value-objects/id.vo";

export class BattleLeaveCallbackFactory implements TimerCallbackFactoryInterface<BattleEntity> {

    public static readonly key = "BattleLeaveCallbackFactory";
    private readonly event = 'leave';

    constructor(
        private readonly battleLeaveUseCase: BattleLeaveUseCase,
    ) {
    }

    createKey(entity: BattleEntity): TimerKey {
        return TimerKey.create(entity, this.event);
    }

    registryKey(): string {
        return BattleLeaveCallbackFactory.key;
    }

    create(entity: BattleEntity): TimerCallback {
        return async () => {

            // const lostPlayer = entity.turn();
            // const batleLeave = new BattleLeave(entity.id, lostPlayer);
            //
            //
            // await this.battleLeaveUseCase.execute(batleLeave);
        };
    }
}

export default BattleLeaveCallbackFactory;
