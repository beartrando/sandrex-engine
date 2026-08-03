const messageConfig = {
    brokers: process.env.KAFKA_BROKERS?.split(',') ?? ['kafka:9092'],
    clientId: process.env.KAFKA_CLIENT_ID ?? 'engine-client',
    groupId: process.env.KAFKA_GROUP_ID ?? 'engine-service',
};

export const messageConsumersConfig: Record<string, ConsumerConfig> = {};

export const messageProducersConfig = {
    battleUpdated: process.env.MESSAGE_TOPIC_BATTLE_UPDATED ?? 'battle.updated',
};

export default messageConfig;
