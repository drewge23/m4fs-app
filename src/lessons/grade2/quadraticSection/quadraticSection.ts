import quadratic from "./Quadratic/quadratic";
import quadraticCoefs from "./QuadraticCoefs/quadraticCoefs";
import quadraticDiscriminant from "./QuadraticDiscriminant/quadraticDiscriminant";
import bonusQuadraticD1 from "./BonusQuadraticD1/bonusQuadraticD1";
import bonusQuadraticViett from "./BonusQuadraticViett/bonusQuadraticViett";

let quadraticSection = {
    id: 1,
    name: 'quadratic',
    lessons: [quadraticCoefs, quadraticDiscriminant, quadratic],
    bonusLessons: [bonusQuadraticD1, bonusQuadraticViett],
}

export default quadraticSection