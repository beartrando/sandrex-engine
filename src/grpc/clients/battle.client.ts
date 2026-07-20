import * as grpc from '@grpc/grpc-js';
import * as battleGrpc from '../generated/battle';
import * as healthGrpc from '../generated/common/health';
import * as emptyGrpc from '../generated/common/empty';
import * as profileGrpc from '../generated/profile';
import config from '../../config/config';
import {GrpcClientManager} from '@shared/grpc-client-manager';
import logger from "@shared/logger";

const battleManager = new GrpcClientManager<battleGrpc.BattleClient>(() => {
    return new battleGrpc.BattleClient(config.serviceBattleUrl, grpc.credentials.createInsecure());
});

// export const get = (grpcRequest: battleGrpc.BattleIdRequest, metadata: grpc.Metadata): Promise<battleGrpc.BattleObject | null> => {
//   return battleManager.call((client, cb) => client.get(grpcRequest, metadata, cb));
// };
//
// export const upsert = (grpcRequest: profileGrpc.ProfileIdRequest, metadata: grpc.Metadata): Promise<battleGrpc.BattleObject | null> => {
//   return battleManager.call<battleGrpc.BattleObject>(
//     (client, cb) => client.upsert(grpcRequest, metadata, cb)
//   ).catch((err) => {
//     logger.error("Upsert battle failed:", err);
//     return null;
//   });
// };

export default battleManager;