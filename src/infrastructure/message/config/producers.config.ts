

export type MessageProducerMap = {
    battleUpdated: BattleEntity;
    battleStarted: BattleEntity;
};

export const messageProducersList: Record<string, string> = {
    battleUpdated: process.env.MESSAGE_PRODUCER_TOPIC_BATTLE_UPDATED ?? 'engine.battle_updated',
    battleStarted: process.env.MESSAGE_PRODUCER_TOPIC_BATTLE_STARTED ?? 'engine.battle_started',
} as const;

export type MessageProducerKey = keyof typeof messageProducersList;

export default messageProducersList;




export const messageProducersList = {
    battleUpdated: 'engine.battle_updated',
    battleStarted: 'engine.battle_started',
} as const;

export type MessageProducerKey = keyof typeof messageProducersList;


export interface MessageProducerMap {
    battleUpdated: BattleEntity;
    battleStarted: BattleEntity;
}