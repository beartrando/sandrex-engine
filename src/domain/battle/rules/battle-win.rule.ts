import BattleEntity from "../battle.entity";
import BattleCellValueEnum from "../enums/battle-cell-value.enum";
import logger from "@shared/logger";

export class BattleWinRule {
    calculate(entity: BattleEntity): boolean {
        const cells = entity.board.cells;

        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6],
        ];

        const result = winningLines.some(([a, b, c]) => {
            const value = cells[a];

            return (
                value !== BattleCellValueEnum.EMPTY &&
                value === cells[b] &&
                value === cells[c]
            );
        });

        // logger.log(entity);
        // logger.log(result);

        return result;
    }
}

export default BattleWinRule;
