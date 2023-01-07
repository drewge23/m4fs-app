import BonusQuadraticD1Component, {generateBonusQuadraticD1} from "./BonusQuadraticD1Component";

let bonusQuadraticD1 = {
    id: 1,
    name: 'bonusQuadraticD1',
    component: BonusQuadraticD1Component,
    generateFunction: generateBonusQuadraticD1,
    reward: 5,
    progress: -1,
    isCompleted: false,
    isBonus: false,
    description: 'the first quadraticSection lesson',
    theory: 'ax² + bx + c = 0 \n' +
            'D₁ = 0.25b² - ac \n' +
            'x₁ = ( -0.5b + √D₁ ) / a \n' +
            'x₂ = ( -0.5b - √D₁ ) / a',
}

export default bonusQuadraticD1;