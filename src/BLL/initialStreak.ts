export const initialStreak = {
    streak: 0,
    streakUpdateTime: new Date(0),
    streakDeadline: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
    streakIsIncrementable: true,
}