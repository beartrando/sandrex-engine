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
import logger from "@shared/logger";
import BattleDomain from "../../domain/battle/battle.domain";
import BattleStatusEnum from "../../domain/battle/enums/battle-status.enum";
import BattleStatus from "../../domain/battle/value-objects/battle-status.vo";

export class BattleService {
    constructor(
        private readonly battleStartUseCase: BattleStartUseCase,
        private readonly battleMoveUseCase: BattleMoveUseCase,
        private readonly battleLeaveUseCase: BattleLeaveUseCase,
        private readonly battleStateStore: CachedIdStateStoreInterface<BattleEntity>,
        private readonly timerService: TimerServiceInterface<TimerKey, Id>,
        private readonly jobService: JobService,
        private readonly engineStreamContainer: EngineStreamContainer,
        private readonly topicBattleStarted: string,
        private readonly topicBattleUpdated: string,
        private readonly topicBattleFinished: string,
    ) {
    }

    async timeout(battleId: Id): Promise<void> {
        logger.log('battleTimeout');

        const battleEntity = await this.battleStateStore.get(battleId);

        if (battleEntity) {
            const profileId = BattleDomain.of(battleEntity).turn();

            const battleLeave = BattleLeave.create({battleId, profileId});

            this.leave(battleLeave);

            return;
        }

        this.terminate(battleId);
    }

    async start(battleEntity: BattleEntity): Promise<void> {

        logger.log(battleEntity);
        const battle = this.battleStartUseCase.execute(battleEntity);

        await this.battleStateStore.set(battle);

        this.timerService.restart(
            TimerKey.create(battle.id),
            battle.id
        );

        const battleObject = BattleProtoMapper.toProto(battle);

        this.jobService.enqueue(this.topicBattleStarted, battleObject);
        this.jobService.enqueue(this.topicBattleUpdated, battleObject);

        const resp = engineProto.BattleResponse.create({battle: battleObject})
        // logger.log(resp);

        this.engineStreamContainer.write(resp);
    }

    async move(battleMove: BattleMove): Promise<void> {
        logger.log(battleMove);

        const battleEntity = await this.battleStateStore.get(battleMove.battleId);

        if (!battleEntity) {
            logger.warn('battle does not exist')
            return;
        }

        const battle = this.battleMoveUseCase.execute(battleEntity, battleMove);

        await this.battleStateStore.set(battle);

        this.timerService.restart(
            TimerKey.create(battle.id),
            battle.id
        );

        const battleObject = BattleProtoMapper.toProto(battle);

        this.jobService.enqueue(this.topicBattleUpdated, battleObject);

        const resp = engineProto.BattleResponse.create({battle: battleObject})

        this.engineStreamContainer.write(resp);

        if (battle.status.equals(new BattleStatus(BattleStatusEnum.Finished))) {
            this.terminate(battle.id);
        }
    }

    async leave(battleLeave: BattleLeave): Promise<void> {
        logger.log(battleLeave);

        const battleEntity = await this.battleStateStore.get(battleLeave.battleId);
        if (battleEntity) {

            const battle = this.battleLeaveUseCase.execute(battleEntity, battleLeave);

            await this.battleStateStore.delete(battle.id);

            const battleObject = BattleProtoMapper.toProto(battle);

            this.jobService.enqueue(this.topicBattleUpdated, battleObject);

            const resp = engineProto.BattleResponse.create({battle: battleObject})

            this.engineStreamContainer.write(resp);
        }

        this.terminate(battleLeave.battleId);
    }

    async terminate(battleId: Id): Promise<void> {
        const battleEntity = await this.battleStateStore.get(battleId);
        if (battleEntity) {
            await this.battleStateStore.delete(battleId);
        }

        this.timerService.stop(TimerKey.create(battleId));

        this.jobService.enqueue(this.topicBattleFinished, battleId);
    }

}

export default BattleService;
