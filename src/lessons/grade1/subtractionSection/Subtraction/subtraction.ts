import SubtractionComponent, {generateSubtraction} from "./SubtractionComponent";

let subtraction = {
    id: 1,
    name: 'subtraction',
    component: SubtractionComponent,
    generateFunction: generateSubtraction,
    reward: 1,
    isCompleted: false,
    isBonus: false,
    description: 'the first subtraction lesson',
    theory: 'just subtract two numbers, love',
}

export default subtraction;