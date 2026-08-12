// import crypto from "crypto";
// import { battleStore, battleNew, makeMove } from "../../../../src/orchestration/engine.service";
// import { BattleCellValue, BattleObject, Status } from "../../../../src/contracts/proto/engine";
// import { BattleMove } from "../../../../src/contracts/proto/engine";
//
//
// describe("upsertBattle", () => {
//   let userId1: string;
//   let userId2: string;
//   let engine: BattleObject;
//
//   beforeEach(async () => {
//     userId1 = crypto.randomUUID();
//     userId2 = crypto.randomUUID();
//
//     engine = {
//       id: crypto.randomUUID(),
//       players: [userId1, userId2],
//       cells: [],
//       status: Status.ACTIVE,
//       winnerId: "",
//     };
//
//     await battleNew(engine);
//   });
//
//   test("новый баттл создаётся пустым", async () => {
//     const stored = await battleStore().get(engine.id);
//
//     expect(stored).not.toBeNull();
//     expect(stored?.cells).toEqual(Array(9).fill(BattleCellValue.CELL_EMPTY));
//     expect(stored?.status).toBe(Status.ACTIVE);
//   });
//
//   test("игрок делает корректный ход", async () => {
//     const move: BattleMove = {
//       battleId: engine.id,
//       userId: userId1,
//       cellIdx: 0,
//     };
//
//     await makeMove(move);
//
//     const updated = await battleStore().get(engine.id);
//     expect(updated?.cells[0]).toBe(BattleCellValue.CELL_X);
//   });
//
//   test("ошибка при неверном ходе (не твой ход)", async () => {
//     const move: BattleMove = {
//       battleId: engine.id,
//       userId: userId2, // должен ходить userId1 первым
//       cellIdx: 0,
//     };
//
//     await expect(makeMove(move)).rejects.toThrow("Not your turn");
//   });
//
//   test("ошибка при занятой клетке", async () => {
//     const move1: BattleMove = {battleId: engine.id, userId: userId1, cellIdx: 0};
//     await makeMove(move1);
//
//     const move2: BattleMove = {battleId: engine.id, userId: userId2, cellIdx: 0};
//     await expect(makeMove(move2)).rejects.toThrow("Cell is not empty");
//   });
//
//   test("победа игрока завершает баттл", async () => {
//     // X выигрывает по первой строке
//     await makeMove({battleId: engine.id, userId: userId1, cellIdx: 0});
//     await makeMove({battleId: engine.id, userId: userId2, cellIdx: 3});
//     await makeMove({battleId: engine.id, userId: userId1, cellIdx: 1});
//     await makeMove({battleId: engine.id, userId: userId2, cellIdx: 4});
//     await makeMove({battleId: engine.id, userId: userId1, cellIdx: 2});
//
//     const finished = await battleStore().get(engine.id);
//     expect(finished).toBeNull(); // баттл удалён из стора
//   });
//
//   test("ничья завершает баттл", async () => {
//     // последовательность ходов, приводящая к ничьей
//     const moves: BattleMove[] = [
//       {battleId: engine.id, userId: userId1, cellIdx: 0},
//       {battleId: engine.id, userId: userId2, cellIdx: 1},
//       {battleId: engine.id, userId: userId1, cellIdx: 2},
//       {battleId: engine.id, userId: userId2, cellIdx: 4},
//       {battleId: engine.id, userId: userId1, cellIdx: 3},
//       {battleId: engine.id, userId: userId2, cellIdx: 5},
//       {battleId: engine.id, userId: userId1, cellIdx: 7},
//       {battleId: engine.id, userId: userId2, cellIdx: 6},
//       {battleId: engine.id, userId: userId1, cellIdx: 8},
//     ];
//
//     for (const move of moves) {
//       await makeMove(move);
//     }
//
//     const finished = await battleStore().get(engine.id);
//     expect(finished).toBeNull(); // баттл удалён из стора
//   });
// });
