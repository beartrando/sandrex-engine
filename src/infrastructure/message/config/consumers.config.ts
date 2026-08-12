export const messageConsumersConfig: Record<string, string> = {
    battleUpdated: process.env.MESSAGE_CONSUMER_TOPIC_BATTLE_STARTED ?? 'engine.started',
};

export default messageConsumersConfig;

