import * as grpc from '@grpc/grpc-js';
import * as battleProto from '../generated/battle';
import * as engineProto from '../generated/engine';
import * as emptyProto from '../generated/common/empty';
import * as battleService from '../../services/battle.service';
import logger from "@shared/logger";


export async function battleChannel(
    call: grpc.ServerDuplexStream<engineProto.BattleRequest, engineProto.BattleResponse>
) {
    try {
        // слушаем входящие события от Streaming
        call.on("data", async (event: engineProto.BattleRequest) => {
            try {
                if (event.start) {
                    const battleObj: battleProto.BattleObject = event.start as battleProto.BattleObject;

                    // logger.log(battleObj);
                    const battle: battleProto.BattleObject = await battleService.battleNew(battleObj);
                    if (battle) call.write(engineProto.BattleResponse.create({battle}));

                }

                if (event.move) {
                    const battleMove = event.move as engineProto.BattleMove;

                    const battle: battleProto.BattleObject = await battleService.makeMove(battleMove);

                    logger.log(battle);
                    if (battle) call.write(engineProto.BattleResponse.create({battle}));
                }

                if (event.leave) {
                    const battle: battleProto.BattleObject | undefined = await battleService.leaveBattle(event.leave.profileId, event.leave.battleId);
                    if (battle) {
                        call.write(engineProto.BattleResponse.create({battle}));
                    }
                }

                if (event.ping) {
                    // logger.info('Streaming-engine stream Ping');
                    const ping = emptyProto.Empty.create({});
                    call.write(engineProto.BattleResponse.create({ping}));

                    // heartbeat — можно просто игнорировать или логировать
                }
            } catch (err: any) {
                console.error("Event error:", err);
            }
        });

        call.on("end", () => {
            call.end();
        });

        call.on("error", (err) => {
            console.error("Stream error:", err);
            call.end();
        });

        logger.log('Grpc streaming connection established');
    } catch (err: any) {
        console.error("battleChannel error:", err);
        call.end();
    }
}
