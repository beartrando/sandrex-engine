import BattleEntity from "../../../domain/entities/battle.entity";

export type StateStoreMap = {
    battle: BattleEntity;
};

export const stateStoresList = {
    battle: "battle",
} as const;

export type StateStoreKey = keyof typeof stateStoresList;

export default stateStoresList;
