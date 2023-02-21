let tasks: any[] = []

const generateQuadraticEquation = () => {
    let a, b, c, D, x1, x2;
    a = Math.ceil(Math.random() * 11) - 6;
    if (!a) a++;
    b = Math.ceil(Math.random() * 21) - 11;
    if (!b) b++;

    c = [];
    for (let i = -50; i < 50; i++) {
        if ( ( ( i !== 0 ) && ( Math.sqrt( b**2 - 4 * a * i ) % 1 ) ) === 0 ) {
            c.push(i);
        }
    }
    c = c[ Math.ceil(Math.random() * c.length) -1];

    D = b**2 - 4 * a * c;
    x1 = ( -b + Math.sqrt(D) ) / ( 2 * a );
    x2 = ( -b - Math.sqrt(D) ) / ( 2 * a );

    return [a, b, c, D, x1, x2];
}
'x² + '
const generateQuadratic = () => {
    const MAXQUAD = 21;
    let quadArr = [];
    for (let i = 0; i < MAXQUAD; i++) {
        quadArr[i] = i**2
    }

    let a = Math.ceil(Math.random() * 10) - 5 || 1;

    let bcArr = [[0, 0]];
    for (let b = -20; b < 20; b++) {
        let c = (quadArr[Math.floor(Math.random() * MAXQUAD)] - b**2) / -4 / a;
        if ( c % 1 === 0) {
            bcArr.push([b, c])
        }
    }
    let [b, c] = bcArr[Math.ceil(Math.random() * (bcArr.length - 1 ))];

    let D = b**2 - 4 * a * c;
    let sqrtD = Math.sqrt(D);
    let x1: any = (-b + sqrtD) / 2 / a;
    let x2: any = (-b - sqrtD) / 2 / a;
    if ( (x1 * 100) % 1 !== 0) { x1 = x1.toFixed(2)}
    if ( (x2 * 100) % 1 !== 0) { x2 = x2.toFixed(2)}

    return {
        coefs: [a, b, c].map(i => i.toString()),
        rightAnswers: [a, b, c, D, sqrtD, x1, x2].map(i => i.toString())
    }
}

const generateFunc = () => {
    const a = Math.ceil(Math.random() * 10) - 5
    const c = Math.ceil(Math.random() * 10) - 5
    const task = a + 'x' + (c >= 0 ? ' + ' + c : ' - ' + -c) + ' = 0 '
    const x = (-c/a).toFixed(2)
    return {
        pic: null,
        task: task,
        subtasks: ['a', 'c', 'x'],
        rightAnswers: [a, c, x]
    }
}

for (let i = 0; i < 20; i++) {
    tasks.push(generateFunc())
}

const lesson_1 = {
    name: 'addition_1',
    description: 'description',
    theory: 'theory',
    isBonus: false,
    isTest: false,
    tasks: tasks,
}

export default lesson_1