import JobService from "../job/service";
import TimerServiceInterface from "../timer/interfaces/timer-service.interface";
import BattleLeaveUseCase from "../../application/use-cases/engine/battle-leave";
import BattleMoveUseCase from "../../application/use-cases/engine/battle-move";
import BattleStartUseCase from "../../application/use-cases/engine/battle-start";
import BattleLeave from "../../domain/battle/value-objects/battle-leave.vo";
import TimerKey from "../timer/value-objects/timer-key.vo";
import BattleEntity from "../../domain/battle/battle.entity";
import EngineStreamContainer from "../grpc/streams/engine.stream.container";
import * as engineProto from "../../contracts/proto/engine";
import BattleProtoMapper from "../grpc/mappers/battle.proto.mapper";
import BattleMove from "../../domain/battle/value-objects/battle-move.vo";
import CachedIdStateStoreInterface from "../state-store/interfaces/cached-id-state-store.interface";
import Id from "../../domain/common/value-objects/id.vo";

export class BattleService {
    constructor(
        private readonly battleStartUseCase: BattleStartUseCase,
        private readonly battleMoveUseCase: BattleMoveUseCase,
        private readonly battleLeaveUseCase: BattleLeaveUseCase,
        private readonly battleStateStore: CachedIdStateStoreInterface<BattleEntity>,
        private readonly timerService: TimerServiceInterface<TimerKey, BattleEntity>,
        private readonly jobService: JobService,
        private readonly engineStreamContainer: EngineStreamContainer,
        private readonly topicBattleStarted: string,
        private readonly topicBattleUpdated: string,
        private readonly topicBattleFinished: string,
    ) {
    }

    async timeout(battleId: Id): Promise<void> {

        // leave(battleLeave: BattleLeave)
        //
        // this.leave()
        //
        // const battle = await this.battleStateStore.get(battleId);
        //
        // if (!battle) {
        //     return;
        // }
        // const battleDomain = BattleDomain.of(battle);
        // const profileId = battleDomain.turn();
        // const battleLeave = BattleLeave.create({battleId: battle.id, profileId})
        // battleDomain.leave(battleLeave);
        // await this.battleStateStore.delete(battle.id);
        // this.timerService.stop(TimerKey.create(battle));
        // this.jobService.enqueue(this.topicBattleUpdated, battle);
        //
        //
        //
        // // const battle = await this.battleStateStore.get(battleId);
        // //
        // // if (!battle) {
        // //     return;
        // // }
        // // const battleDomain = BattleDomain.of(battle);
        // // const profileId = battleDomain.turn();
        // // const battleLeave = BattleLeave.create({battleId: battle.id, profileId})
        // // battleDomain.leave(battleLeave);
        // // await this.battleStateStore.delete(battle.id);
        // // this.timerService.stop(TimerKey.create(battle));
        // // this.jobService.enqueue(this.topicBattleUpdated, battle);
    }

    async start(battleEntity: BattleEntity): Promise<void> {

        const battle = this.battleStartUseCase.execute(battleEntity);

        await this.battleStateStore.set(battle);

        this.timerService.restart(
            TimerKey.create(battle),
            battle
        );

        this.jobService.enqueue(this.topicBattleStarted, battle);
        this.jobService.enqueue(this.topicBattleUpdated, battle);

        const resp = engineProto.BattleResponse.create({battle: BattleProtoMapper.toProto(battle)})

        this.engineStreamContainer.write(resp);
    }

    async move(battleMove: BattleMove): Promise<void> {
        const battleEntity = await this.battleStateStore.get(battleMove.battleId);

        if (!battleEntity) {
            return;
        }
        const battle = this.battleMoveUseCase.execute(battleEntity, battleMove);

        await this.battleStateStore.set(battle);

        this.timerService.restart(
            TimerKey.create(battle),
            battle
        );

        this.jobService.enqueue(this.topicBattleUpdated, battle);

        const resp = engineProto.BattleResponse.create({battle: BattleProtoMapper.toProto(battle)})

        this.engineStreamContainer.write(resp);
    }

    async leave(battleLeave: BattleLeave): Promise<void> {
        const battleEntity = await this.battleStateStore.get(battleLeave.battleId);
        if (!battleEntity) {
            return;
        }

        const battle = this.battleLeaveUseCase.execute(battleEntity, battleLeave);

        await this.battleStateStore.delete(battle.id);

        this.timerService.stop(TimerKey.create(battle));

        this.jobService.enqueue(this.topicBattleUpdated, battle);
        this.jobService.enqueue(this.topicBattleFinished, battle);

        const resp = engineProto.BattleResponse.create({battle: BattleProtoMapper.toProto(battle)})

        this.engineStreamContainer.write(resp);
    }

}

export default BattleService;
