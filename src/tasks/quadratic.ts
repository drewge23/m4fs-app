import {generateFunction, lesson, theory} from "./taskTypes";
import {populateTasks} from "./populateTasks";

const generateQuadraticCoefs = (maxNum: number = 21) => {
    const MAXQUAD = maxNum;
    let quadArr = [];
    for (let i = 0; i < MAXQUAD; i++) {
        quadArr[i] = i ** 2
    }

    let a = Math.ceil(Math.random() * 10) - 5 || 1;

    let bcArr = [[0, 0]];
    for (let b = -20; b < 20; b++) {
        let c = (quadArr[Math.floor(Math.random() * MAXQUAD)] - b ** 2) / -4 / a;
        if (c % 1 === 0) {
            bcArr.push([b, c])
        }
    }
    let [b, c] = bcArr[Math.ceil(Math.random() * (bcArr.length - 1))];

    let D = b ** 2 - 4 * a * c;
    let sqrtD = Math.sqrt(D);
    let x1: any = (-b + sqrtD) / 2 / a;
    let x2: any = (-b - sqrtD) / 2 / a;
    if ((x1 * 100) % 1 !== 0) {
        x1 = x1.toFixed(2)
    }
    if ((x2 * 100) % 1 !== 0) {
        x2 = x2.toFixed(2)
    }

    return {
        coefs: [a, b, c],
        rightAnswers: [a, b, c, D, sqrtD, x1, x2]
    }
}
const generateQuadraticTaskGeneral: generateFunction = (maxNum: number, linesCount: number = 3) => {
    let {coefs, rightAnswers} = generateQuadraticCoefs(maxNum)
    let bx = ''
    if (coefs[1] == 0) bx = ''
    if (coefs[1] < 0) bx = ' - ' + -coefs[1] + 'x'
    if (coefs[1] > 0) bx = ' + ' + coefs[1] + 'x'
    let c = ''
    if (coefs[2] == 0) c = ''
    if (coefs[2] < 0) c = ' - ' + -coefs[2]
    if (coefs[2] > 0) c = ' + ' + coefs[2]
    const task = `${coefs[0]}x²` + bx + c + ' = 0'
    let subtasks = ['a', 'b', 'c', 'D', '√D', 'x₁', 'x₂'] // 'lb' for a line break?
    if (rightAnswers[3] == 0) subtasks = ['a', 'b', 'c', 'D', '√D', 'x']
    subtasks = subtasks.splice(0, linesCount)
    rightAnswers = rightAnswers.splice(0, linesCount)
    return {
        pic: null,
        task,
        subtasks,
        rightAnswers
    }
}

export const quadratic_1: lesson = {
    lessonId: "quadratic_1",
    reward: 3,
    gradeNum: 2,
    sectionName: 'quadratic',
    lessonName: 'Coefficients',
    description: 'Let\'s learn about quadratic equations coefficients!',
    theory: [null, 'ax² + bx + c = 0'],
    tasks: populateTasks(() => generateQuadraticTaskGeneral(21, 3))
}
export const quadratic_2: lesson = {
    lessonId: "quadratic_2",
    reward: 10,
    gradeNum: 2,
    sectionName: 'quadratic',
    lessonName: 'Discriminant',
    description: 'Let\'s learn about discriminant!',
    theory: [null, 'ax² + bx + c = 0', 'D = b² - 4ac'],
    tasks: populateTasks(() => generateQuadraticTaskGeneral(21, 5)),
}
export const bonus_quadratic_1: lesson = {
    lessonId: "bonus_quadratic_1",
    reward: 10,
    gradeNum: 2,
    sectionName: 'quadratic',
    lessonName: 'Quadratic Equations',
    description: 'Let\'s solve quadratic equations!',
    theory: [null, 'theory', 'ax² + bx + c = 0', 'D = b² - 4ac', 'x = (-b +- D)/2a'],
    isBonus: true,
    tasks: populateTasks(() => generateQuadraticTaskGeneral(21, 7))
}
export const quadratic_test: lesson = {
    lessonId: "quadratic_test",
    reward: 10,
    gradeNum: 2,
    sectionName: 'quadratic',
    isTest: true,
    tasks: populateTasks(() => generateQuadraticTaskGeneral(7))
}
export const quadratic_theory: theory = {
    gradeNum: 2,
    sectionName: "quadratic",
    lessonId: "quadratic_theory",
    isTheory: true,
    imageUrl: null,
    text: [],
    examples: [],
}