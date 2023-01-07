import QuadraticCoefsComponent, {generateQuadraticCoefs} from "./QuadraticCoefsComponent";

let quadraticCoefs = {
    id: 1,
    name: 'quadraticCoefs',
    component: QuadraticCoefsComponent,
    generateFunction: generateQuadraticCoefs,
    reward: 1,
    isCompleted: false,
    isBonus: false,
    description: 'the first quadraticSection lesson',
    theory: 'ax² + bx + c = 0',
}

export default quadraticCoefs;