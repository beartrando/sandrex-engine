import stateStoresList from "../config/state-store-list";

export type StateStoreKey = keyof typeof stateStoresList;

export default StateStoreKey;
