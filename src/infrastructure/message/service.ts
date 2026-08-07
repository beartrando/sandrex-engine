import ProducerService from "./producer.service";
import ConsumerService from "./consumer.service";

export class MessageService {

    private started = false;

    constructor(
        private readonly producerService: ProducerService,
        private readonly consumerService: ConsumerService,
    ) {
    }

    async start(): Promise<void> {

        if (this.started) {
            return;
        }

        await this.producerService.start();
        await this.consumerService.start();

        this.started = true;
    }

    async stop(): Promise<void> {
        await this.consumerService.stop();
        await this.producerService.stop();
    }

    async check(): Promise<boolean> {
        const producer = await this.producerService.check();
        const consumer = await this.consumerService.check();

        return producer && consumer;
    }
}

export default MessageService;
