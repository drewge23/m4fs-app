import {generateFunction, lesson, theory} from "./taskTypes";
import {populateTasks} from "./populateTasks";

const generateAdditionTaskGeneral: generateFunction = (maxNum: number) => {
    let a = Math.ceil(Math.random() * maxNum) || 1;
    let b = Math.ceil(Math.random() * maxNum) || 1;
    return {
        pic: null,
        task: a + ' + ' + b + ' = ?',
        rightAnswers: [a + b],
        subtasks: [a + ' + ' + b]
    }
}

export const addition_1: lesson = {
    lessonId: "addition_1",
    reward: 1,
    gradeNum: 1,
    sectionName: 'addition',
    lessonName: '2 + 2 = ?',
    description: 'Let\'s start doing some mafs!',
    theory: [null, 'theory', '1 + 1 = 2', 'more theory'],
    isBonus: false,
    isTest: false,
    tasks: populateTasks(() => generateAdditionTaskGeneral(5))
}
export const addition_2: lesson = {
    lessonId: "addition_2",
    reward: 2,
    gradeNum: 1,
    sectionName: 'addition',
    lessonName: '20 + 20 = ?',
    description: 'Lesson 2',
    theory: [null, 'theory', '10 + 10 = 20', 'more theory'],
    isBonus: false,
    isTest: false,
    tasks: populateTasks(() => generateAdditionTaskGeneral(10))
}
export const addition_bonus_1: lesson = {
    lessonId: "bonus_addition_1",
    reward: 5,
    gradeNum: 1,
    sectionName: 'addition',
    lessonName: '1000 + 1000 = ?',
    description: 'Bonus lesson 1',
    theory: [null, 'theory', '10 + 10 = 20', 'more theory'],
    isBonus: true,
    isTest: false,
    tasks: populateTasks(() => generateAdditionTaskGeneral(1000))
}
export const addition_test: lesson = {
    lessonId: "addition_test", reward: 5,
    gradeNum: 1,
    sectionName: 'addition',
    lessonName: 'Test',
    description: 'Addition test',
    theory: [null, 'theory', '100 + 100 = 200', 'more theory'],
    isBonus: false,
    isTest: true,
    tasks: populateTasks(() => generateAdditionTaskGeneral(100))
}
export const addition_theory: theory = {
    gradeNum: 1,
    sectionName: "addition",
    lessonId: "addition_theory",
    isTheory: true,
    imageUrl: null,
    text: ['You need to add two numbers one to another'],
    examples: ['2 + 2 = 4']
}