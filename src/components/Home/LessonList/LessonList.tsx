import {Card, CardActions, CardContent, Container} from "@mui/material";
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import StarIcon from '@mui/icons-material/Star';
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {bonusLessonsCompleted, incrementBonusProgress, lessonsCompleted} from "../../../BLL/progressSlice";
import {useCollectionOnce} from "react-firebase-hooks/firestore";
import Lessons from "./Lessons";
import Test from "./Test";
import {spend} from "../../../BLL/moneySlice";

const LessonList = ({sectionName}: any) => {
    const gradeNum = useSelector((state: any) => state.grade)
    const db = useSelector((state: any) => state.firebase.db)

    // @ts-ignore
    const [section, loading] = useCollectionOnce(db.collection('lessons')
        .doc(`grade_${gradeNum}`).collection(sectionName))

    const [test, setTest] = useState(null)
    const [lessons, setLessons] = useState([])
    const [bonuses, setBonuses] = useState([])
    useEffect(() => {
        if (!section) return
        // @ts-ignore
        setTest(section?.docs.filter((lesson: any) => lesson.data().isTest)[0])
        // @ts-ignore
        setLessons(section?.docs.filter((lesson: any) => (!lesson.data().isBonus && !lesson.data().isTest)))
        // @ts-ignore
        setBonuses(section?.docs.filter((lesson: any) => lesson.data().isBonus))
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
        if (sectionProgress === lessons.length) {
            dispatch(lessonsCompleted({grade: gradeNum - 1, section: sectionName}))
        }
        if (!bonuses.length) return
        if (bonusProgress === bonuses.length) {
            dispatch(bonusLessonsCompleted({grade: gradeNum - 1, section: sectionName}))
        }
    }, [sectionProgress, bonusProgress, lessons, bonuses])

    const lessonsProps = {lessons, sectionProgress, testCompleted, sectionName}
    const bonusesProps = {lessons: bonuses, sectionProgress: bonusProgress, testCompleted, sectionName}
    const testProps = {test, testCompleted, sectionName}

    return (<>
        {!loading && <Card id={sectionName}>
            <CardContent>
                <h1>{sectionName}</h1>

                <Lessons {...lessonsProps} isBonus={false}/>
                {bonuses.length !== 0 && <>
                    <h3>Bonus levels</h3>
                    {bonusProgress < 0 && <button onClick={() => {
                        dispatch(spend(5)) // 5 --> section.price
                        dispatch(incrementBonusProgress({grade: gradeNum - 1, section: sectionName}))
                    }}> Unlock bonus lessons for 5$ </button>}
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
                {/*/!*                <button onClick={() => alert(lesson.theory)}>Theory</button>*!/*/}
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

                    <div>
                        {stars > 0 ? <StarIcon/> : <StarBorderPurple500OutlinedIcon/>}
                        {stars > 1 ? <StarIcon/> : <StarBorderPurple500OutlinedIcon/>}
                        {stars > 2 ? <StarIcon/> : <StarBorderPurple500OutlinedIcon/>}
                    </div>
                </Container>
            </CardActions>
        </Card>}
        {loading && <div style={{height: '300px'}}>Loading...</div>}
    </>)
}

export default LessonList;
