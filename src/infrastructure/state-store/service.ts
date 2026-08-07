import Redis from "ioredis";

import logger from "@shared/logger";

import sleep from "../../utils/sleep";
import StateStoreInterface from "./interfaces/state-store.interface";
import {StateStoreKey} from "./config/state-store.config";


export class StateStoreService {

    private readonly registry = new Map<
        StateStoreKey,
        StateStoreInterface<any>
    >();

    async start(): Promise<void> {
        await this.loadAll();
    }

    async stop(): Promise<void> {
        await this.clearAll();
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

    async clearAll(): Promise<void> {
        for (const store of this.registry.values()) {
            await store.clear();
        }
    }

    async loadAll(): Promise<void> {
        for (const store of this.registry.values()) {
            await store.restoreAll();
        }
    }
}

export default StateStoreService;
