import HealthUseCase from "../application/use-cases/health/health";
import StatusUseCase from "../application/use-cases/health/status";
import LivezUseCase from "../application/use-cases/health/livez";
import ReadyzUseCase from "../application/use-cases/health/readyz";
import HealthHandler from "../infrastructure/grpc/handlers/health.handler";
import GrpcService from "../infrastructure/grpc/service";
import grpcConfig from "../infrastructure/grpc/config";
import Application from "../application/application";
import MessageService from "../infrastructure/message/service";
import JobService from "../infrastructure/job/service";
import {messageConfig, messageConsumersConfig, messageProducersConfig} from "../infrastructure/message/config";
import jobConfig from "../infrastructure/job/config";
import AuthService from "../infrastructure/auth/service";
import authConfig from "../infrastructure/auth/config";
import cacheConfig from "../infrastructure/state-store/config";
import StateStoreService from "../infrastructure/state-store/service";
import BattleStartedConsumer from "../infrastructure/message/consumers/battle-started";
import BattleStartUseCase from "../application/use-cases/engine/battle-start";
import EngineHandler from "../infrastructure/grpc/handlers/engine.handler";
import BattleMoveUseCase from "../application/use-cases/engine/battle-move";
import BattleLeaveUseCase from "../application/use-cases/engine/battle-leave";

function buildApplication() {
    const authService = new AuthService(authConfig);

    const jobService = new JobService(jobConfig, messageConfig, messageProducersConfig)

    const stateStoreService = new StateStoreService(cacheConfig);

    // const battleRepository = new PrismaBattleRepository(dbService.client);

    const battleStartUseCase = new BattleStartUseCase();
    const battleMoveUseCase = new BattleMoveUseCase();
    const battleLeaveUseCase = new BattleLeaveUseCase();
    const battleStartedConsumer = new BattleStartedConsumer(battleStartUseCase);

    const messageService = new MessageService(messageConfig, messageConsumersConfig, battleStartedConsumer);

    // const getUseCase = new GetProfileUseCase(battleRepository);
    // const getActiveByProfileUseCase = new GetActiveByProfileUseCase(battleRepository);
    // const startUseCase = new StartUseCase(battleRepository, jobService, messageProducersConfig.battleStarted);

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
