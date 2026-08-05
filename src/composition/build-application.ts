import HealthUseCase from "../application/use-cases/health/health";
import StatusUseCase from "../application/use-cases/health/status";
import LivezUseCase from "../application/use-cases/health/livez";
import ReadyzUseCase from "../application/use-cases/health/readyz";
import HealthHandler from "../infrastructure/grpc/handlers/health.handler";
import GrpcService from "../infrastructure/grpc/service";
import {config as grpcConfig} from "../infrastructure/grpc/config";
import Application from "../application/application";
import MessageService from "../infrastructure/message/service";
import JobService from "../infrastructure/job/service";
import DbService from "../infrastructure/db/service";
import {
    config as messageConfig,
    messageConsumersConfig,
    messageProducersConfig
} from "../infrastructure/message/config";
import {config as jobConfig} from "../infrastructure/job/config";
import AuthService from "../infrastructure/auth/service";
import {config as authConfig} from "../infrastructure/auth/config";
import {config as cacheConfig} from "../infrastructure/cache/config";
import CacheService from "../infrastructure/cache/service";
import BattleStartedConsumer from "../infrastructure/message/consumers/battle-started";
import BattleStartedUseCase from "../application/use-cases/engine/battle-started";

function buildApplication() {
    const authService = new AuthService(authConfig);

    const jobService = new JobService(jobConfig, messageConfig, messageProducersConfig)

    const dbService = new DbService();
    const cacheService = new CacheService(cacheConfig);

    // const battleRepository = new PrismaBattleRepository(dbService.client);

    const battleStartedUseCase = new BattleStartedUseCase(battleRepository);
    const battleStartedConsumer = new BattleStartedConsumer(battleStartedUseCase);

    const messageService = new MessageService(messageConfig, messageConsumersConfig, battleStartedConsumer);
    //
    // const getUseCase = new GetProfileUseCase(battleRepository);
    // const getActiveByProfileUseCase = new GetActiveByProfileUseCase(battleRepository);
    // const startUseCase = new StartUseCase(battleRepository, jobService, messageProducersConfig.battleStarted);

    const healthUseCase = new HealthUseCase(dbService, messageService, jobService);
    const statusUseCase = new StatusUseCase;
    const livezUseCase = new LivezUseCase;
    const readyzUseCase = new ReadyzUseCase;

    const engineHandler = new EngineHandler(
        // getUseCase,
        // getActiveByProfileUseCase,
        // startUseCase,
    );

    const healthHandler = new HealthHandler(healthUseCase, statusUseCase, livezUseCase, readyzUseCase);

    const grpcService = new GrpcService(grpcConfig.port, engineHandler, healthHandler);

    return new Application(grpcService, dbService, jobService, messageService, cacheService);
}


export default buildApplication;
