import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    CardActions,
    CardContent,
    Container,
    Typography
} from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import StarIcon from '@mui/icons-material/Star';
import {NavLink} from "react-router-dom";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {lessonsCompleted} from "../../BLL/progressSlice";
import {useCollectionOnce} from "react-firebase-hooks/firestore";

const LessonList = ({sectionName}: any) => {
    const gradeNum = useSelector((state: any) => state.grade)
    const db = useSelector((state: any) => state.firebase.db)

    // @ts-ignore
    const [section, loading] = useCollectionOnce(db.collection('lessons')
        .doc(`grade_${gradeNum}`).collection(sectionName))

    const [[sectionProgress, bonusProgress, testCompleted, sectionCompleted, bonusCompleted], setProgressArray]
        = useState([0, 0, false, false, false])
    const progress = useSelector((state: any) => state.progress[gradeNum - 1][sectionName]);
    useEffect(() => {
        if (!progress) return
        setProgressArray(progress);
    }, [progress])

    let stars = 0;
    for (let bool of [testCompleted, sectionCompleted, bonusCompleted]) {
        if (bool) {
            stars++
        }
    }

    function isDisabled(index: number) {
        return sectionProgress < index
    }
    function isGold(index: number) {
        return sectionProgress > index
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if (!section) return
        // @ts-ignore
        if (sectionProgress === section.docs.length) {
            dispatch(lessonsCompleted({grade: gradeNum - 1, section: sectionName}))
        }
    }, [sectionProgress, bonusProgress])

    return (<>
        {!loading && <Card id={sectionName}>
            <CardContent>
                <h1>{sectionName}</h1>
                {/*<p>{section.description || 'section description goes here'}</p>*/}

                {/*LESSONS*/}
                {section?.docs.map((lesson: any, index: number) => {
                    return (
                        <Accordion key={lesson.id} disabled={!testCompleted && isDisabled(index)}>
                            <AccordionSummary
                                expandIcon={isGold(index)
                                    ? <StarIcon/>
                                    : <StarBorderPurple500OutlinedIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{lesson.data().name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/*<Typography>{lesson.description}</Typography>*/}
                                <button onClick={() => alert(lesson.data().theory)}>Theory</button>
                                <div>
                                    <NavLink to={"/lesson"}
                                             state={{
                                                 sectionName: sectionName,
                                                 lessonId: lesson.id,
                                                 sectionProgress: sectionProgress,
                                                 lessonIndex: index,
                                             }}> start </NavLink>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
                {/*BONUS LESSONS*/}
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
                    <NavLink to={"/lesson"}
                             state={{
                                 sectionName: sectionName,
                                 lessonIndex: 1,
                                 isTest: true,
                                 id: 1,
                             }}>
                        <Box
                            component={motion.div}
                            style={{
                                width: 100, height: 100, borderRadius: '50%',
                                backgroundColor: testCompleted ? 'gold' : 'pink'
                            }}
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                        >
                            <EmojiEventsIcon sx={{marginTop: 4.5}}/>
                        </Box>
                    </NavLink>
                    <div>
                        {stars > 0 ? <StarIcon/> : <StarBorderPurple500OutlinedIcon/>}
                        {stars > 1 ? <StarIcon/> : <StarBorderPurple500OutlinedIcon/>}
                        {stars > 2 ? <StarIcon/> : <StarBorderPurple500OutlinedIcon/>}
                    </div>
                </Container>
            </CardActions>
        </Card>}
        {loading && <div>Loading...</div>}
    </>)
}

export default LessonList;