export const messageProducersConfig: Record<string, string> = {
    battleStarted: process.env.MESSAGE_PRODUCER_TOPIC_BATTLE_STARTED ?? 'engine.battle_started',
    battleUpdated: process.env.MESSAGE_PRODUCER_TOPIC_BATTLE_UPDATED ?? 'engine.battle_updated',
    battleTerminated: process.env.MESSAGE_PRODUCER_TOPIC_BATTLE_TERMINATED ?? 'engine.battle_terminated',
};

export default messageProducersConfig;
