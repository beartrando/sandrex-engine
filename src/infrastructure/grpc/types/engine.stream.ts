import * as grpc from "@grpc/grpc-js";
import * as engineProto from "../../../contracts/proto/engine";

export type EngineStream = grpc.ServerDuplexStream<
    engineProto.BattleRequest,
    engineProto.BattleResponse
>;

export default EngineStream;
