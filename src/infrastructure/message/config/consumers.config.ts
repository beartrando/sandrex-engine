
export type messageConsumerMap = {
    battleUpdated: BattleEntity;
};

export const messageConsumersList: Record<string, string> = {
    battleUpdated: process.env.MESSAGE_CONSUMER_TOPIC_BATTLE_STARTED ?? 'battle.started',
};

export type messageConsumerKey = keyof typeof stateStoresList;
export default messageConsumersList;

