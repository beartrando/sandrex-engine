import BattleCellValueEnum from "../../../../domain/battle/enums/battle-cell-value.enum";

export class CellValueCacheMapper {
    static toPersistence(cell: BattleCellValueEnum): string {
        return cell;
    }

    static toDomain(cell: string): BattleCellValueEnum {
        if (!Object.values(BattleCellValueEnum).includes(cell as BattleCellValueEnum)) {
            throw new Error(`Unknown CellValue: ${cell}`);
        }

        return cell as BattleCellValueEnum;
    }
}

export default CellValueCacheMapper;
