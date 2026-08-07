import StateStoreConfig from "../interfaces/state-store-config";

export const stateStoreConfig: StateStoreConfig = {
    host: process.env.REDIS_HOST ?? "redis",
    port: Number(process.env.REDIS_PORT) ?? 6379,
    password: process.env.REDIS_PASSWORD ?? "",
};

export default stateStoreConfig;
