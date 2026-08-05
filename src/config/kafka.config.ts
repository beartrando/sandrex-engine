const messageConfig = {
};

export const messageConsumersConfig: Record<string, ConsumerConfig> = {};

export const messageProducersConfig = {
    battleUpdated: process.env.MESSAGE_TOPIC_BATTLE_UPDATED ?? 'battle.updated',
};

export default messageConfig;
