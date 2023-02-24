// const generateQuadraticEquation = () => {
//     let a, b, c, D, x1, x2;
//     a = Math.ceil(Math.random() * 11) - 6;
//     if (!a) a++;
//     b = Math.ceil(Math.random() * 21) - 11;
//     if (!b) b++;
//
//     c = [];
//     for (let i = -50; i < 50; i++) {
//         if ( ( ( i !== 0 ) && ( Math.sqrt( b**2 - 4 * a * i ) % 1 ) ) === 0 ) {
//             c.push(i);
//         }
//     }
//     c = c[ Math.ceil(Math.random() * c.length) -1];
//
//     D = b**2 - 4 * a * c;
//     x1 = ( -b + Math.sqrt(D) ) / ( 2 * a );
//     x2 = ( -b - Math.sqrt(D) ) / ( 2 * a );
//
//     return [a, b, c, D, x1, x2];
// }

const generateAdditionTaskGeneral = (maxNum: number) => {
    let a = Math.ceil(Math.random() * 2 * maxNum) - maxNum || 1;
    let b = Math.ceil(Math.random() * 2 * maxNum) - maxNum || 1;
    return {
        pic: null,
        task: a + ' + ' + b + ' = ?',
        rightAnswers: [a + b],
        subtasks: [a + ' + ' + b]
    }
}

const generateLinear = () => {
    const k = Math.ceil(Math.random() * 10) - 5
    const b = Math.ceil(Math.random() * 10) - 5
    const task = k + 'x' + (b >= 0 ? ' + ' + b : ' - ' + -b) + ' = 0 '
    const x = (-b / k).toFixed(2)
    return {
        pic: null,
        task: task,
        subtasks: ['k', 'b', 'x'],
        rightAnswers: [k, b, x]
    }
}

const generateQuadraticCoefs = () => {
    const MAXQUAD = 21;
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
const generateQuadraticTaskGeneral = (linesCount: number) => {
    let {coefs, rightAnswers} = generateQuadraticCoefs()
    let bx = ''
    if (coefs[1] == 0) bx = ''
    if (coefs[1] < 0) bx = ' - ' + -coefs[1] + 'x'
    if (coefs[1] > 0) bx = ' + ' + coefs[1] + 'x'
    let c = ''
    if (coefs[2] == 0) c = ''
    if (coefs[2] < 0) c = ' - ' + -coefs[2]
    if (coefs[2] > 0) c = ' + ' + coefs[2]
    const task = `${coefs[0]}x²` + bx + c + ' = 0'
    let subtasks = ['a', 'b', 'c', 'D', '√D', 'x₁', 'x₂']
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

const populateTasks = (generateFunction: Function) => {
    let tasks: any[] = []
    for (let i = 0; i < 20; i++) {
        tasks.push(generateFunction())
    }
    return tasks
}

const addition_1 = {
    gradeNum: 1,
    sectionName: 'addition',
    lessonName: 'addition_1',
    description: 'Let\'s start doing some mafs!',
    theory: [null, 'theory', '1 + 1 = 2', 'more theory'],
    isBonus: false,
    isTest: false,
    tasks: populateTasks(() => generateAdditionTaskGeneral(5)),
}
const addition_2 = {
    gradeNum: 1,
    sectionName: 'addition',
    lessonName: 'addition_2',
    description: 'Lesson 2',
    theory: [null, 'theory', '10 + 10 = 20', 'more theory'],
    isBonus: false,
    isTest: false,
    tasks: populateTasks(() => generateAdditionTaskGeneral(10)),
}
const linear_1 = {
    gradeNum: 2,
    sectionName: 'linear',
    lessonName: 'linear_2',
    description: 'Let\'s learn about linear equations',
    theory: [null, 'theory', 'kx + b = 0', 'more theory', 'x = -b/k', 'good luck!'],
    isBonus: false,
    isTest: false,
    tasks: populateTasks(() => generateLinear()),
}
const quadratic_1 = {
    gradeNum: 2,
    sectionName: 'quadratic',
    lessonName: 'quadratic_1',
    description: 'Let\'s learn about qadratic equations!',
    theory: [null, 'theory', 'ax² + bx + c = 0', 'more theory', 'x = tbh i dont remember rn', 'good luck!'],
    isBonus: false,
    isTest: false,
    tasks: populateTasks(() => generateQuadraticTaskGeneral(3)),
}
const quadratic_2 = {
    gradeNum: 2,
    sectionName: 'quadratic',
    lessonName: 'quadratic_2',
    description: 'Let\'s learn about quadratic equations!',
    theory: [null, 'theory', 'ax² + bx + c = 0', 'more theory', 'x = tbh i dont remember rn', 'good luck!'],
    isBonus: false,
    isTest: false,
    tasks: populateTasks(() => generateQuadraticTaskGeneral(5)),
}
const quadratic_3 = {
    gradeNum: 2,
    sectionName: 'quadratic',
    lessonName: 'quadratic_3',
    description: 'Let\'s learn about quadratic equations!',
    theory: [null, 'theory', 'ax² + bx + c = 0', 'more theory', 'x = tbh i dont remember rn', 'good luck!'],
    isBonus: false,
    isTest: false,
    tasks: populateTasks(() => generateQuadraticTaskGeneral(7)),
}

const lessons = [addition_1, addition_2, linear_1, quadratic_1, quadratic_2, quadratic_3]
export default lessons