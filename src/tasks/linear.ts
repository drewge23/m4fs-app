import {generateFunction, lesson, theory} from "./taskTypes";
import {populateTasks} from "./populateTasks";

const generateLinear: generateFunction = (maxNum: number = 5) => {
    let k = Math.ceil(Math.random() * 2 * maxNum) - maxNum
    if (k === 0) k++
    const b = Math.ceil(Math.random() * 2 * maxNum) - maxNum
    const task = k + 'x' + (b >= 0 ? ' + ' + b : ' - ' + -b) + ' = 0 '
    let x = (-b / k) % 1
        ? (-b / k).toFixed(2)
        : (-b / k)
    return {
        pic: null,
        task,
        rightAnswers: [k, b, x],
        subtasks: ['k', 'b', 'x'],
    }
}

export const linear_1: lesson = {
    lessonId: "linear_1", reward: 5,
    gradeNum: 2,
    sectionName: 'linear',
    lessonName: 'Linear Equations',
    description: 'Let\'s learn about linear equations!',
    theory: [null, 'kx + b = 0', 'kx = -b', 'x = -b/k'],
    isBonus: false,
    isTest: false,
    tasks: populateTasks(() => generateLinear(10))
}
export const linear_test: lesson = {
    gradeNum: 2,
    sectionName: "linear",
    lessonId: "linear_test",
    reward: 10,
    isTest: true,
    tasks: populateTasks(() => generateLinear(15))
}
export const linear_theory: theory = {
    gradeNum: 2,
    sectionName: "linear",
    lessonId: "linear_theory",
    isTheory: true,
    imageUrl: null,
    text: [
        'Linear equation formula is',
        'In real life linear equation looks something like this: ',
        'where',
        'Keep only kx on the left side: ',
        'Then divide both sides by k: ',
        'Now we have',
        'Good luck!'
    ],
    examples: ['kx + b = 0', '6x + 4 = 22', 'k = 6', '6x = 22 - 4 = 18', '6x : 6 = 18 : 6', 'x = 3'],
}