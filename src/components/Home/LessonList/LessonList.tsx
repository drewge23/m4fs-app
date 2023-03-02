import {Card, CardActions, CardContent, Container, Skeleton} from "@mui/material";
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import StarIcon from '@mui/icons-material/Star';
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {
    incrementBonusProgress,
    setBonusCompleted, setLessonsCompleted
} from "../../../BLL/progressSlice";
import {useCollectionOnce} from "react-firebase-hooks/firestore";
import Lessons from "./Lessons";
import Test from "./Test";
import {spend} from "../../../BLL/moneySlice";
import {incrementStars} from "../../../BLL/starsSlice";
import s from './lessonList.module.css'
import LessonListSkeleton from "./LessonListSkeleton";
import Theory from "./Theory";

const LessonList = ({sectionName, sectionPrice}: any) => {
    const money = useSelector((state: any) => state.money)
    const gradeNum = useSelector((state: any) => state.grade)
    const db = useSelector((state: any) => state.firebase.db)

    // @ts-ignore
    const [section, loading] = useCollectionOnce(db.collection('lessons')
        .doc(`grade_${gradeNum}`).collection(sectionName))

    const [lessons, setLessons] = useState([])
    const [bonuses, setBonuses] = useState([])
    const [test, setTest] = useState(null)
    const [theory, setTheory] = useState(null)
    useEffect(() => {
        if (!section) return
        // @ts-ignore
        setLessons(section?.docs.filter((lesson: any) =>
            (!lesson.data().isBonus && !lesson.data().isTest && !lesson.data().isTheory)))
        // @ts-ignore
        setBonuses(section?.docs.filter((lesson: any) => lesson.data().isBonus))
        // @ts-ignore
        setTest(section?.docs.filter((lesson: any) => lesson.data().isTest)[0])
        // @ts-ignore
        setTheory(section?.docs.filter((lesson: any) => lesson.data().isTheory)[0])
    }, [section])

    const [[sectionProgress, bonusProgress, sectionCompleted, bonusCompleted, testCompleted], setProgressArray]
        = useState([0, 0, false, false, false])
    const progress = useSelector((state: any) => state.progress[gradeNum - 1][sectionName]);
    useEffect(() => {
        if (!progress) return
        setProgressArray(progress);
    }, [progress])

    let stars = 0;
    for (let bool of [sectionCompleted, bonusCompleted, testCompleted]) {
        if (bool) {
            stars++
        }
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if (!lessons.length) return
        if (!sectionCompleted && sectionProgress === lessons.length) {
            dispatch(setLessonsCompleted({grade: gradeNum - 1, section: sectionName}))
            dispatch(incrementStars())
        }
        if (!bonuses.length) return
        if (!bonusCompleted && bonusProgress === bonuses.length) {
            dispatch(setBonusCompleted({grade: gradeNum - 1, section: sectionName}))
            dispatch(incrementStars())
        }
    }, [sectionProgress, bonusProgress, lessons, bonuses])

    const lessonsProps = {lessons, sectionProgress, testCompleted, sectionName}
    const bonusesProps = {lessons: bonuses, sectionProgress: bonusProgress, testCompleted, sectionName}
    const testProps = {test, testCompleted, sectionName}

    const unlockBonus = (price: number) => {
        if (!money) return
        if (money >= price) {
            dispatch(spend(price))
            dispatch(incrementBonusProgress({grade: gradeNum - 1, section: sectionName}))
        } else {
            alert('Not enough money!')
        }
    }

    const [theoryIsOpen, setTheoryIsOpen] = useState(false)
    const theoryProps = {theoryIsOpen, setTheoryIsOpen, theory: theory}

    return (<>
        {loading && <LessonListSkeleton/>}
        {!loading && <Card id={sectionName} elevation={5} className={s.lessonList}>
            <CardContent>
                <h1 className={s.sectionName}>{sectionName[0].toUpperCase() + sectionName.substring(1)}</h1>
                {theory && <button onClick={() => setTheoryIsOpen(true)}>Theory</button>}
                {theory && <Theory {...theoryProps}/>}

                <Lessons {...lessonsProps} isBonus={false}/>
                {bonuses.length !== 0 && <>
                    <h3>Bonus lessons</h3>
                    {bonusProgress < 0 && <button className={s.bonusUnlock} onClick={() => {
                        unlockBonus(sectionPrice)
                    }}> Unlock bonus lessons for {sectionPrice}$ </button>}
                </>}
                <Lessons {...bonusesProps} isBonus={true}/>

                {/*BONUS LESSONS*/}
                {/*<h3>bonus lessons</h3>*/}
                {/*// {section.bonusLessons.map((lesson: any, index: number) => {*/}
                {/*//     return (*/}
                {/*//         <Accordion key={lesson.id}*/}
                {/*//                    disabled={*/}
                {/*//                        // (sectionProgress / section.lessons.length) <= (index / section.bonusLessons.length)*/}
                {/*//                        !testCompleted && (lesson.progress >= 0*/}
                {/*//                            ? sectionProgress < lesson.progress*/}
                {/*//                            : sectionProgress < (section.lessons.length + lesson.progress) )*/}
                {/*//                    }>*/}
                {/*//             <AccordionSummary*/}
                {/*/!*                expandIcon={*!/*/}
                {/*/!*                    // bonusProgress > index*!/*/}
                {/*//                     lesson.isCompleted*/}
                {/*//                         ? <StarIcon/>*/}
                {/*/!*                        : <StarBorderPurple500OutlinedIcon/>}*!/*/}
                {/*/!*                aria-controls="panel1a-content"*!/*/}
                {/*/!*                id="panel1a-header"*!/*/}
                {/*/!*            >*!/*/}
                {/*/!*                <Typography>{lesson.name}</Typography>*!/*/}
                {/*/!*            </AccordionSummary>*!/*/}
                {/*/!*            <AccordionDetails>*!/*/}
                {/*/!*                <Typography>{lesson.description}</Typography>*!/*/}
                {/*/!*                <button onClick={() => alert(lesson.theory)}>LessonTheory</button>*!/*/}
                {/*/!*                <div>*!/*/}
                {/*/!*                    <NavLink to={"/lesson"}*!/*/}
                {/*/!*                             state={{*!/*/}
                {/*/!*                                 grade: grade,*!/*/}
                {/*/!*                                 sectionName: section.name,*!/*/}
                {/*/!*                                 sectionProgress: sectionProgress,*!/*/}
                {/*/!*                                 bonusProgress: bonusProgress,*!/*/}

                {/*/!*                                 lessonIndex: index,*!/*/}
                {/*//                                  isBonus: true,*/}
                {/*//                                  id: lesson.id,*/}
                {/*//                              }}> start </NavLink>*/}
                {/*//                 </div>*/}
                {/*//             </AccordionDetails>*/}
                {/*//         </Accordion>*/}
                {/*//     )*/}
                {/*// })}*/}
            </CardContent>
            <CardActions>
                <Container>

                    {test && <Test {...testProps}/>}

                    <div style={{fontSize: '1.5rem'}}>
                        {stars > 0 ? '⭐ ' : '🔮️ '}
                        {stars > 1 ? '⭐ ' : '🔮️ '}
                        {stars > 2 ? '⭐ ' : '🔮️ '}
                    </div>
                </Container>
            </CardActions>
        </Card>}
    </>)
}

export default LessonList;
