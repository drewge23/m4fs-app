import QuadraticComponent, {generateQuadratic} from "./QuadraticComponent";

let quadratic = {
    id: 1,
    name: 'quadratic',
    component: QuadraticComponent,
    generateFunction: generateQuadratic,
    reward: 5,
    isCompleted: false,
    isBonus: false,
    description: 'the first quadraticSection lesson',
    theory: 'ax² + bx + c = 0 \n' +
            'D = b² - 4ac \n' +
            'x₁ = ( -b + √D ) / 2a \n' +
            'x₂ = ( -b + √D ) / 2a',
}

export default quadratic;