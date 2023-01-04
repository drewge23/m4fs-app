import AdditionComponent, {generateAddition} from "./AdditionComponent";

let addition = {
    id: 1,
    name: 'addition',
    component: AdditionComponent,
    generateFunction: generateAddition,
    reward: 1,
    isCompleted: false,
    isBonus: false,
    description: 'the first quadraticSection lesson',
    theory: 'just add two numbers, love',
}

export default addition;