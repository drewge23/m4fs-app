export type task = {
    pic: null | string
    task: string
    rightAnswers: any[] // !
    subtasks: string[]
}

export type generateFunction = (num: number, linesNum?: number) => task

export type lesson = {
    gradeNum: number,
    sectionName: string,
    lessonId: string,
    lessonName?: string,
    description?: string,
    theory?: any[],
    reward: number,
    isBonus?: boolean,
    isTest?: boolean,
    tasks: task[],
}

export type theory = {
    gradeNum: number,
    sectionName: string,
    lessonId: string,
    isTheory: true,
    imageUrl: null | string,
    text: string[],
    examples: string[],
}