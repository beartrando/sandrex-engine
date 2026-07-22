const kafkaConfig = {
    brokers: process.env.KAFKA_BROKERS?.split(',') ?? ['kafka:9092'],
    clientId: process.env.KAFKA_CLIENT_ID || 'engine-client',
    groupId: process.env.KAFKA_GROUP_ID || 'engine-service',
};

type ConsumerConfig = {
    topic: string;
    handler: (message: unknown) => Promise<void>;
};

export const kafkaConsumersConfig: Record<string, ConsumerConfig> = {};

export const kafkaProducersConfig = {
    battleUpdated: process.env.KAFKA_TOPIC_BATTLE_UPDATED || 'battle.updated',
};

export default kafkaConfig;
