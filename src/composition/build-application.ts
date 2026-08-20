import Application from "../application/application";

import HealthUseCase from "../application/use-cases/health/health";
import LivezUseCase from "../application/use-cases/health/livez";
import ReadyzUseCase from "../application/use-cases/health/readyz";
import StatusUseCase from "../application/use-cases/health/status";

import BattleStartUseCase from "../application/use-cases/engine/battle-start";
import BattleMoveUseCase from "../application/use-cases/engine/battle-move";
import BattleLeaveUseCase from "../application/use-cases/engine/battle-leave";

import GrpcService from "../infrastructure/grpc/service";
import grpcConfig from "../infrastructure/grpc/grpc.config";
import EngineHandler from "../infrastructure/grpc/handlers/engine.handler";
import HealthHandler from "../infrastructure/grpc/handlers/health.handler";

import AuthService from "../infrastructure/auth/service";
import authConfig from "../infrastructure/auth/config";

import CacheService from "../infrastructure/cache/service";
import CacheStore from "../infrastructure/cache/cache-store";
import redisConfig from "../infrastructure/cache/config/redis.config";
import BattleCacheMapper from "../infrastructure/cache/mappers/battle.cache.mapper";

import CachedIdStateStore from "../infrastructure/state-store/state-stores/cached-id-state-store";
import StateStoreService from "../infrastructure/state-store/service";

import JobService from "../infrastructure/job/service";
import jobConfig from "../infrastructure/job/job.config";

import MessageService from "../infrastructure/message/service";
import messageConfig from "../infrastructure/message/configs/message.config";
import messageConsumersConfig from "../infrastructure/message/configs/consumers.config";
import BattleStartedConsumer from "../infrastructure/message/consumers/battle-started";
import messageProducersConfig from "../infrastructure/message/configs/producers.config";

import TimerService from "../infrastructure/timer/service";
import BattleTimeoutCallbackFactory from "../infrastructure/timer/callbacks/battle-timeout-callback-factory";
import domainBattleConfig from "../domain/battle/config/config";
import TimerCallbackFactoryHolder from "../infrastructure/timer/callback-factory-holder";
import BattleEntity from "../domain/battle/battle.entity";
import TimerKey from "../infrastructure/timer/value-objects/timer-key.vo";
import BattleService from "../infrastructure/battle/service";
import EngineStreamContainer from "../infrastructure/grpc/streams/engine.stream.container";


function buildApplication() {
    // Infrastructure
    const authService = new AuthService(authConfig);
    const timerCallbackFactoryHolder = new TimerCallbackFactoryHolder<BattleEntity>();
    const timerService =
        new TimerService<TimerKey, BattleEntity>(timerCallbackFactoryHolder, domainBattleConfig.battleTurnTimeLimit);

    const cacheService = new CacheService(redisConfig);

    const jobService = new JobService(
        jobConfig,
        messageConfig,
        messageProducersConfig,
    );

    // Cache stores
    const battleCacheStore = new CacheStore(
        "engine:",
        "engine:index",
        BattleCacheMapper,
    );

    cacheService.register(
        "battle",
        battleCacheStore,
    );

    // State stores
    const stateStoreService = new StateStoreService();

    const battleStateStore = new CachedIdStateStore(
        battleCacheStore,
    );

    stateStoreService.register(
        "battle",
        battleStateStore,
    );

    // Battle use cases
    const battleStartUseCase = new BattleStartUseCase();

    const battleMoveUseCase = new BattleMoveUseCase();

    const battleLeaveUseCase = new BattleLeaveUseCase();

    const engineStreamContainer = new EngineStreamContainer();

    const battleService = new BattleService(
        battleStartUseCase,
        battleMoveUseCase,
        battleLeaveUseCase,
        battleStateStore,
        timerService,
        jobService,
        engineStreamContainer,
        messageProducersConfig.battleStarted,
        messageProducersConfig.battleUpdated,
        messageProducersConfig.battleFinished,
    );


    // Timer callbacks
    const battleTimeoutCallbackFactory = new BattleTimeoutCallbackFactory(
        battleService,
    );

    timerCallbackFactoryHolder.factory = battleTimeoutCallbackFactory;


    const statusUseCase = new StatusUseCase();
    const livezUseCase = new LivezUseCase();
    const readyzUseCase = new ReadyzUseCase();

    // Handlers
    const engineHandler = new EngineHandler(
        battleService,
        engineStreamContainer,
    );

    // Message consumers
    const battleStartedConsumer = new BattleStartedConsumer(
        battleStartUseCase,
        engineHandler,
    );

    const messageService = new MessageService(
        messageConfig,
        messageConsumersConfig,
    );

    messageService.addConsumer(
        messageConsumersConfig.battleUpdated,
        battleStartedConsumer.execute.bind(battleStartedConsumer),
    );

    // Health
    const healthUseCase = new HealthUseCase(
        messageService,
        jobService,
        cacheService,
    );

    const healthHandler = new HealthHandler(
        healthUseCase,
        statusUseCase,
        livezUseCase,
        readyzUseCase,
    );

    // Transport
    const grpcService = new GrpcService(
        grpcConfig.port,
        engineHandler,
        healthHandler,
    );

    return new Application(
        grpcService,
        stateStoreService,
        jobService,
        messageService,
        cacheService,
    );
}

export default buildApplication;
