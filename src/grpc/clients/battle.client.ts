import * as grpc from '@grpc/grpc-js';
import * as battleProto from '../generated/battle';
import * as healthProto from '../generated/common/health';
import * as emptyProto from '../generated/common/empty';
import * as profileProto from '../generated/profile';
import config from '../../config/config';
import {GrpcClientManager} from '@shared/grpc-client-manager';
import logger from "@shared/logger";

const battleManager = new GrpcClientManager<battleProto.BattleClient>(() => {
    return new battleProto.BattleClient(config.serviceBattleUrl, grpc.credentials.createInsecure());
});

// export const get = (grpcRequest: battleProto.BattleIdRequest, metadata: grpc.Metadata): Promise<battleProto.BattleObject | null> => {
//   return battleManager.call((client, cb) => client.get(grpcRequest, metadata, cb));
// };
//
// export const upsert = (grpcRequest: profileProto.ProfileIdRequest, metadata: grpc.Metadata): Promise<battleProto.BattleObject | null> => {
//   return battleManager.call<battleProto.BattleObject>(
//     (client, cb) => client.getOrCreate(grpcRequest, metadata, cb)
//   ).catch((err) => {
//     logger.error("Upsert battle failed:", err);
//     return null;
//   });
// };

export default battleManager;