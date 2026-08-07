import BattleEntity from "../../../domain/entities/battle.entity";

export const cacheStoreConfig = {
    battle: {} as BattleEntity,
} as const;

export type CacheStoreKey = keyof typeof cacheStoreConfig;

export type CacheStoreEntity<K extends CacheStoreKey> = typeof cacheStoreConfig[K];

export default cacheStoreConfig;
