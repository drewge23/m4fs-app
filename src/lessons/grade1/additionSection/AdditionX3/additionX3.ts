import AdditionX3Component, {generateAddition} from "./AdditionX3Component";

let additionX3 = {
    id: 2,
    name: 'additionX3',
    component: AdditionX3Component,
    generateFunction: generateAddition,
    reward: 1,
    isCompleted: false,
    isBonus: false,
    description: 'the second addition lesson',
    theory: 'just add six numbers, love',
}

export default additionX3;