export const populateTasks = (generateFunction: Function) => {
    let tasks: any[] = []
    for (let i = 0; i < 20; i++) {
        tasks.push(generateFunction())
    }
    return tasks
    // return JSON.stringify(tasks)
}
