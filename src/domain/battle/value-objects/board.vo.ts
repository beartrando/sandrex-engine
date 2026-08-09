import CellValueEnum from "../enums/cell-value.enum";

export class Board {
    constructor(
        readonly cells: readonly CellValueEnum[],
    ) {
        if (cells.length !== 9) {
            throw new Error("Board must contain 9 cells");
        }

        if (
            cells.some(
                cell => !Object.values(CellValueEnum).includes(cell),
            )
        ) {
            throw new Error("Invalid cell value");
        }
    }

    static empty(): Board {
        return new Board(
            Array(9).fill(CellValueEnum.EMPTY),
        );
    }
}

export default Board;
