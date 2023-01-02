import BonusAdditionComponent, {generateBonusAddition} from "./BonusAdditionComponent";

let bonusAddition = {
    id: 1,
    name: 'bonusAddition',
    component: BonusAdditionComponent,
    generateFunction: generateBonusAddition,
    reward: 10,
    description: 'the first bonus lesson',
    theory: 'just add two numbers, love',

    isCompleted: false,
    isBonus: true,
}

export default bonusAddition;