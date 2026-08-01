export const config = {
    appName: process.env.APP_NAME ?? 'engine',
    appVersion: process.env.APP_VERSION ?? '0.0.0',
    appEnv: process.env.APP_ENV ?? 'prod',

    port: process.env.GRPC_PORT ?? 50051,
    serviceBattleUrl: process.env.SERVICE_BATTLE_URL ?? 'battle:50051',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
    battleTurnTimeLimit: Number(process.env.BATTLE_TURN_TIME_LIMIT) ?? 10,
};

export default config;
