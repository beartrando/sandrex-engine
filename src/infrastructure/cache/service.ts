import Redis from "ioredis";

import logger from "@shared/logger";

import sleep from "../../utils/sleep";

export interface RedisConfig {
    host: string;
    port: number;
    password?: string;
}

export class CacheService {
    private client?: Redis;

    constructor(
        private readonly config: RedisConfig,
    ) {
    }

    get client(): Redis {
        if (!this._client) {
            throw new Error("CacheService is not started");
        }

        return this._client;
    }

    async start(): Promise<void> {
        await this.retryInit(() => this.connect());
    }

    async stop(): Promise<void> {
        if (this.client) {
            await this.client.quit();
            this.client = undefined;
        }
    }

    async check(): Promise<boolean> {
        try {
            const redis = await this.getClient();

            await redis.ping();

            return true;
        } catch (err) {
            logger.error("Redis health check failed", err);

            return false;
        }
    }

    private async connect(): Promise<void> {
        if (this.client) {
            return;
        }

        const client = new Redis({
            host: this.config.host,
            port: this.config.port,
            password: this.config.password,
        });

        await new Promise<void>((resolve, reject) => {
            client.once("connect", resolve);
            client.once("error", reject);
        });

        this.client = client;

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
                    "⏳ Waiting for Redis...",
                );

                await sleep(3000);
            }
        }
    }
}

export default CacheService;
