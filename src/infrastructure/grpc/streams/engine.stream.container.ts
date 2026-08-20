import EngineStream from "../types/engine.stream";
import * as engineProto from "../../../contracts/proto/engine";

export class EngineStreamContainer {
    private stream: EngineStream | null = null;

    connect(stream: EngineStream): void {
        this.stream = stream;
    }

    disconnect(stream: EngineStream): void {
        if (this.stream === stream) {
            this.stream = null;
        }
    }

    get current(): EngineStream | null {
        return this.stream;
    }

    write(resp: engineProto.BattleResponse): void {
        if (!this.stream) {
            throw new Error("Engine stream is not connected");
        }

        this.stream.write(resp);
    }
}

export default EngineStreamContainer;
