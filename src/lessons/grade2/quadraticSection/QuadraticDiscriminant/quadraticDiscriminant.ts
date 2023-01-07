import QuadraticDiscriminantComponent, {generateQuadraticDiscriminant} from "./QuadraticDiscriminantComponent";

let quadraticDiscriminant = {
    id: 2,
    name: 'quadraticDiscriminant',
    component: QuadraticDiscriminantComponent,
    generateFunction: generateQuadraticDiscriminant,
    reward: 3,
    isCompleted: false,
    isBonus: false,
    description: 'the second quadraticSection lesson',
    theory: 'ax² + bx + c = 0 \n' +
            'D = b² - 4ac'
}

export default quadraticDiscriminant;