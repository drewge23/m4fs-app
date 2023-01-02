import BonusAdditionComponent2, {generateBonusAddition} from "./BonusAdditionComponent2";

let bonusAddition2 = {
    id: 2,
    name: 'bonusAddition',
    component: BonusAdditionComponent2,
    generateFunction: generateBonusAddition,
    reward: 10,
    description: 'the second bonus lesson',
    theory: 'just add two really big numbers, love',

    isCompleted: false,
    isBonus: true,
}

export default bonusAddition2;