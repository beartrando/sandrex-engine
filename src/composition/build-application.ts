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
import stateStoreConfig from "../infrastructure/state-store/config/state-store.config";
import StateStore from "../infrastructure/state-store/state-store";
import BattleRedisMapper from "../infrastructure/state-store/mappers/battle.redis.mapper";
import CacheStore from "../infrastructure/cache/cache-store";
import CacheService from "../infrastructure/cache/service";
import redisConfig from "../infrastructure/cache/config/redis.config";

function buildApplication() {
    const authService = new AuthService(authConfig);

    // const jobService = new JobService(jobConfig, messageConfig, messageProducersConfig)

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





    const battleStartUseCase = new BattleStartUseCase(stateStoreService.store("battle"), messageService);
    const battleMoveUseCase = new BattleMoveUseCase(stateStoreService.store("battle"), messageService);
    const battleLeaveUseCase = new BattleLeaveUseCase(stateStoreService.store("battle"), messageService);
    const battleStartedConsumer = new BattleStartedConsumer(battleStartUseCase);

    const messageService = new MessageService(messageConfig, messageConsumersConfig, battleStartedConsumer);

    const healthUseCase = new HealthUseCase(stateStoreService, messageService, jobService);
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

    return new Application(grpcService, stateStoreService, jobService, messageService);
}


export default buildApplication;
