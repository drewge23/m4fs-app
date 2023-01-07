import BonusQuadraticViettComponent, {generateBonusQuadraticViett} from "./BonusQuadraticViettComponent";

let bonusQuadraticViett = {
    id: 2,
    name: 'bonusQuadraticViett',
    component: BonusQuadraticViettComponent,
    generateFunction: generateBonusQuadraticViett,
    reward: 5,
    progress: -1,
    isCompleted: false,
    isBonus: false,
    description: 'the Viet theorem lesson',
    theory: 'ax² + bx + c = 0 \n' +
            'x₁ + x₂ = -b \n' +
            'x₁ * x₂ = c',
}

export default bonusQuadraticViett;