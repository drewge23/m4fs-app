import addition from "./Addition/addition";
import additionX3 from "./AdditionX3/additionX3";
import bonusAddition from "./BonusAddition/bonusAddition";
import bonusAddition2 from "./BonusAddition2/bonusAddition2";

let additionSection = {
    id: 1,
    name: 'addition',
    // progress: 0,
    lessons: [addition, additionX3],
    bonusLessons: [bonusAddition, bonusAddition2],
}

export default additionSection