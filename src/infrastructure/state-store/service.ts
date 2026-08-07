import Redis from "ioredis";

import logger from "@shared/logger";

import sleep from "../../utils/sleep";
import StateStoreConfig from "./interfaces/state-store-config";



export class StateStoreService {
    constructor(
        private readonly config: StateStoreConfig,
    ) {
    }

    private _client?: Redis;

    get client(): Redis {
        if (!this._client) {
            throw new Error("StateStoreService is not started");
        }

        return this._client;
    }

    async start(): Promise<void> {
        await this.retryInit(() => this.connect());
    }

    async stop(): Promise<void> {
        if (this._client) {
            await this._client.quit();
            this._client = undefined;
        }
    }

    async check(): Promise<boolean> {
        try {
            const redis = this.client;

            await redis.ping();

            return true;
        } catch (err) {
            logger.error("Redis health check failed", err);

            return false;
        }
    }

    private async connect(): Promise<void> {
        if (this._client) {
            return;
        }

        const client = new Redis({
            host: this.config.host,
            port: this.config.port,
            password: this.config.password,
        });

        await new Promise<void>((resolve, reject) => {
            client.once("ready", resolve);
            client.once("error", reject);
        });

        this._client = client;

        logger.info("✅ Redis initialized");
    }

    private async retryInit(
        fn: () => Promise<void>,
    ): Promise<void> {
        while (true) {
            try {
                await fn();

                return;
            } catch (err) {
                logger.warn(
                    {err},
                    "Redis unavailable. Retrying in 3 seconds..."
                );

                await sleep(3000);
            }
        }
    }

    get store(name: StateStoreKey) {

    }

    async restore(): Promise<void> {
        // await this.retryInit(() => this.connect());
    }
}

export default StateStoreService;
