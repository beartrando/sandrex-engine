import Redis from "ioredis";

import logger from "@shared/logger";

import sleep from "../../utils/sleep";
import StateStoreInterface from "./interfaces/state-store.interface";
import {StateStoreKey, StateStoreMap} from "./config/state-store.config";


export class StateStoreService {

    private readonly registry = new Map<
        StateStoreKey,
        StateStoreInterface<any>
    >();

    async start(): Promise<void> {
        // await this.retryInit(async () => {
        //     await this.connect();
        //     this.initStores();
        // });
    }

    async stop(): Promise<void> {
        // if (this._client) {
        //     await this._client.quit();
        //     this._client = undefined;
        // }
    }

    register<K extends StateStoreKey>(
        key: K,
        store: StateStoreInterface<StateStoreMap[K]>,
    ): void {
        if (this.registry.has(key)) {
            throw new Error(
                `State store "${key}" is already registered`,
            );
        }

        this.registry.set(key, store);
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

    private initStores() {
        for (const store of this.registry.values()) {
            store.setClient(this.client);
        }
    }

    private async retryInit(
        fn: () => Promise<void>,
    ): Promise<void> {
        // while (true) {
        //     try {
        //         await fn();
        //
        //         return;
        //     } catch (err) {
        //         logger.warn(
        //             {err},
        //             "Redis unavailable. Retrying in 3 seconds..."
        //         );
        //
        //         await sleep(3000);
        //     }
        // }
    }

    store<K extends StateStoreKey>(
        key: K,
    ): StateStoreInterface<StateStoreMap[K]> {
        const store = this.registry.get(key);

        if (!store) {
            throw new Error(
                `State store "${key}" is not registered`,
            );
        }

        return store as StateStoreInterface<StateStoreMap[K]>;
    }

    async loadAll(): Promise<void> {
        for (const store of this.registry.values()) {
            await store.restoreAll();
        }
    }
}

export default StateStoreService;
