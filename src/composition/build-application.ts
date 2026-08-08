import HealthUseCase from "../application/use-cases/health/health";
import StatusUseCase from "../application/use-cases/health/status";
import LivezUseCase from "../application/use-cases/health/livez";
import ReadyzUseCase from "../application/use-cases/health/readyz";
import HealthHandler from "../infrastructure/grpc/handlers/health.handler";
import GrpcService from "../infrastructure/grpc/service";
import grpcConfig from "../infrastructure/grpc/grpc.config";
import Application from "../application/application";
import MessageService from "../infrastructure/message/service";
import JobService from "../infrastructure/job/service";
import jobConfig from "../infrastructure/job/job.config";
import AuthService from "../infrastructure/auth/service";
import authConfig from "../infrastructure/auth/auth.config";
import StateStoreService from "../infrastructure/state-store/service";
import BattleStartedConsumer from "../infrastructure/message/consumers/battle-started";
import BattleStartUseCase from "../application/use-cases/engine/battle-start";
import EngineHandler from "../infrastructure/grpc/handlers/engine.handler";
import BattleMoveUseCase from "../application/use-cases/engine/battle-move";
import BattleLeaveUseCase from "../application/use-cases/engine/battle-leave";
import StateStore from "../infrastructure/state-store/state-store";
import BattleRedisMapper from "../infrastructure/state-store/mappers/battle.redis.mapper";
import CacheStore from "../infrastructure/cache/cache-store";
import CacheService from "../infrastructure/cache/service";
import redisConfig from "../infrastructure/cache/config/redis.config";
import messageConfig from "../infrastructure/message/config/message.config";
import messageProducersConfig from "../infrastructure/message/config/producers.config";
import messageConsumersConfig from "../infrastructure/message/config/consumers.config";
import BattleLeaveCallbackFactory from "../infrastructure/timer/callbacks/battle-leave";
import TimerService from "../infrastructure/timer/service";

function buildApplication() {
    const authService = new AuthService(authConfig);
    const timerService = new TimerService();

    const jobService = new JobService(jobConfig, messageConfig, messageProducersConfig)

    const cacheService = new CacheService(redisConfig);

    const battleCacheStore = new CacheStore(
        "battle:",
        "battle:index",
        BattleRedisMapper,
    );

    cacheService.register("battle", battleCacheStore);


    const stateStoreService = new StateStoreService();

    const battleStateStore = new StateStore(battleCacheStore);

    stateStoreService.register("battle", battleStateStore);

    const battleStartUseCase = new BattleStartUseCase(battleStateStore, timerService, jobService);
    const battleMoveUseCase = new BattleMoveUseCase(battleStateStore, timerService, jobService);
    const battleLeaveUseCase = new BattleLeaveUseCase(battleStateStore, timerService, jobService);
    const battleStartedConsumer = new BattleStartedConsumer(battleStartUseCase);

    const battleLeaveCallbackFactory = new BattleLeaveCallbackFactory(battleLeaveUseCase);
    timerService.registerFactory(BattleLeaveCallbackFactory.key, battleLeaveCallbackFactory);

    const messageService = new MessageService(messageConfig, messageConsumersConfig, battleStartedConsumer);

    const healthUseCase = new HealthUseCase(messageService, jobService, cacheService);
    const statusUseCase = new StatusUseCase;
    const livezUseCase = new LivezUseCase;
    const readyzUseCase = new ReadyzUseCase;

    const engineHandler = new EngineHandler(
        battleStartUseCase,
        battleMoveUseCase,
        battleLeaveUseCase,
    );

    const healthHandler = new HealthHandler(healthUseCase, statusUseCase, livezUseCase, readyzUseCase);

    const grpcService = new GrpcService(grpcConfig.port, engineHandler, healthHandler);

    return new Application(grpcService, stateStoreService, jobService, messageService, cacheService);
}


export default buildApplication;
