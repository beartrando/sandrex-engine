export const messageConsumersConfig: Record<string, string> = {
    battleCreated: process.env.MESSAGE_CONSUMER_TOPIC_BATTLE_CREATED ?? 'battle.created',
};

export default messageConsumersConfig;

