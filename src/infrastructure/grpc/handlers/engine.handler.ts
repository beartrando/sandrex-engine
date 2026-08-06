import * as grpc from '@grpc/grpc-js';
import * as battleProto from '../../../contracts/proto/battle';
import * as engineProto from '../../../contracts/proto/engine';
import logger from "@shared/logger";
import BattleLeaveUseCase from "../../../application/use-cases/engine/battle-leave";
import BattleMoveUseCase from "../../../application/use-cases/engine/battle-move";
import BattleStartUseCase from "../../../application/use-cases/engine/battle-start";
import BattleEntity from "../../../domain/entities/battle.entity";
import BattleProtoMapper from "../mappers/battle.proto.mapper";


export class EngineHandler {
    constructor(
        private readonly battleMoveUseCase: BattleMoveUseCase,
        private readonly battleStartUseCase: BattleStartUseCase,
        private readonly battleLeaveUseCase: BattleLeaveUseCase
    ) {
    }

    async battleChannel(
        call: grpc.ServerDuplexStream<engineProto.BattleRequest, engineProto.BattleResponse>
    ) {
        try {
            // слушаем входящие события от Streaming
            call.on("data", async (event: engineProto.BattleRequest) => {
                try {
                    if (event.start) {
                        const battleEntity: BattleEntity = BattleProtoMapper.toDomain(event.start);

                        // logger.log(battleObj);
                        const battle = BattleProtoMapper.toProto(await this.battleStartUseCase.execute(battleEntity));
                        if (battle) call.write(engineProto.BattleResponse.create({battle}));

                    }

                    if (event.move) {
                        const battleMove = event.move as engineProto.BattleMove;

                        const battle: battleProto.BattleObject = await this.battleMoveUseCase.execute(battleMove);

                        logger.log(battle);
                        if (battle) call.write(engineProto.BattleResponse.create({battle}));
                    }

                    if (event.leave) {
                        const battle: battleProto.BattleObject | undefined = await this.battleLeaveUseCase.execute(event.leave.profileId, event.leave.battleId);
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
            // callbackError(callback, err);
            call.end();
        }
    }
}

export default EngineHandler;


