let tasks: any[] = []

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

export default tasks