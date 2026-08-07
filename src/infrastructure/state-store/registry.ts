import {StateStoreKey, stateStores} from "./config";
import StateStore from "./state-store.interface";
import BattleStateStore from "./stores/battle-state.store";
import StateStoreConfig from "./interfaces/state-store-config";

export class StateStoreRegistry {

    private stores = new Map<StateStoreKey, StateStore<any>>();

    constructor(
        private readonly config: StateStoreConfig,
    ) {
    }

    register(
        key: StateStoreKey,
        store: StateStore<any>,
    ): void {
        this.stores.set(key, store);
    }

    get<T>(
        key: StateStoreKey,
    ): StateStore<T> {
        const store = this.stores.get(key);

        if (!store) {
            throw new Error(`State store ${key} not registered`);
        }

        return store;
    }
}