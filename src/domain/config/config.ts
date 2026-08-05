export const config = {
    accessSecret: process.env.ACCESS_SECRET!,
    battleTurnTimeLimit: Number(process.env.BATTLE_TURN_TIME_LIMIT) ?? 40,
};

export default config;

