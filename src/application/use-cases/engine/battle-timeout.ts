import BattleDomain from "../../../domain/battle/battle.domain";
import BattleLeave from "../../../domain/battle/value-objects/battle-leave.vo";
import BattleEntity from "../../../domain/battle/battle.entity";
import logger from "@shared/logger";

export class BattleTimeoutUseCase {
    constructor() {
    }

    execute(battleId: Id, battleLeave: BattleLeave): BattleEntity {
        logger.log('timeout is not implemented yet')
        logger.log(battleId)



        // const battleDomain = BattleDomain.of(battle);
        // return battleDomain.leave(battleLeave);




        // leave(battleLeave: BattleLeave)
        //
        // this.leave()
        //
        // const battle = await this.battleStateStore.get(battleId);
        //
        // if (!battle) {
        //     return;
        // }
        // const battleDomain = BattleDomain.of(battle);
        // const profileId = battleDomain.turn();
        // const battleLeave = BattleLeave.create({battleId: battle.id, profileId})
        // battleDomain.leave(battleLeave);
        // await this.battleStateStore.delete(battle.id);
        // this.timerService.stop(TimerKey.create(battle));
        // this.jobService.enqueue(this.topicBattleUpdated, battle);
        //
        //
        //
        // // const battle = await this.battleStateStore.get(battleId);
        // //
        // // if (!battle) {
        // //     return;
        // // }
        // // const battleDomain = BattleDomain.of(battle);
        // // const profileId = battleDomain.turn();
        // // const battleLeave = BattleLeave.create({battleId: battle.id, profileId})
        // // battleDomain.leave(battleLeave);
        // // await this.battleStateStore.delete(battle.id);
        // // this.timerService.stop(TimerKey.create(battle));
        // // this.jobService.enqueue(this.topicBattleUpdated, battle);

    }
}


export default BattleTimeoutUseCase;

