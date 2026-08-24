import Id from "../../../domain/common/value-objects/id.vo";

export class TimerKey {
    private constructor(readonly value: string) {
    }

    static create<TId extends Id<TId>>(entity: TId): TimerKey {
        return new TimerKey(entity.value);
    }

    toString(): string {
        return this.value;
    }
}

export default TimerKey;
