export class MoveBattleOperation {
    constructor(
        private readonly turnRule: BattleTurnRule,
        private readonly cellRule: BattleCellRule,
        private readonly winRule: BattleWinRule,
    ) {}

    execute(
        battle: BattleEntity,
        move: BattleMove,
    ): BattleEntity {
        this.turnRule.check(battle, move);
        this.cellRule.check(battle, move);

        const symbol = battle.playerIds.symbolFor(move.profileId);

        const board = battle.board.move(
            move.cellIdx,
            symbol,
        );

        if (this.winRule.check(board)) {
            return battle.finish(move.profileId, board);
        }

        // ...
    }
}