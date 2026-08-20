export const messageProducersConfig: Record<string, string> = {
    battleStarted: process.env.MESSAGE_PRODUCER_TOPIC_BATTLE_STARTED ?? 'engine.battle_started',
    battleUpdated: process.env.MESSAGE_PRODUCER_TOPIC_BATTLE_UPDATED ?? 'engine.battle_updated',
    battleFinished: process.env.MESSAGE_PRODUCER_TOPIC_BATTLE_FINISHED ?? 'engine.battle_finished',
};

export default messageProducersConfig;
