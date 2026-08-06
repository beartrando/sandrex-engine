import logger from "@shared/logger";
import GrpcService from "../infrastructure/grpc/service";
import JobService from "../infrastructure/job/service";
import MessageService from "../infrastructure/message/service";
import StateStoreService from "../infrastructure/state-store/service";

export class Application {
    constructor(
        private readonly grpcService: GrpcService,
        private readonly stateStoreService: StateStoreService,
        private readonly jobService: JobService,
        private readonly messageService: MessageService
    ) {
    }

    async start(): Promise<void> {

        try {
            await this.messageService.start();
            await this.jobService.start();
            await this.stateStoreService.start();
            await this.grpcService.start();
            logger.info(
                '🚀 Engine service started',
            );
        } catch (err) {
            logger.error(
                {err},
                '💥 Failed to start Engine',
            );
            process.exit(1);
        }

        process.on(
            'SIGINT',
            async () => {
                logger.info(
                    '🛑 Shutting down...',
                );

                await this.stop();

                process.exit(0);
            },
        );
    }

    async stop() {
        await this.grpcService.stop();
        await this.stateStoreService.stop();
        await this.jobService.stop();
        await this.messageService.stop();
    }
}

export default Application;
