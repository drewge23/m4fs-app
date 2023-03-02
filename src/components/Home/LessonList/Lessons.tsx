import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import {NavLink} from "react-router-dom";
import s from './lessonList.module.css'

function Lessons({lessons, sectionProgress, testCompleted, sectionName, isBonus}: any) {
    function isDisabled(index: number) {
        return sectionProgress < index
    }

    function isGold(index: number) {
        return sectionProgress > index
    }

    return (
        <>
            {lessons && lessons.map((lesson: any, index: number) => {
                return (
                    <Accordion key={lesson.id} disabled={(!testCompleted || isBonus) && isDisabled(index)}>
                        <AccordionSummary
                            expandIcon={isGold(index)
                                ? '⭐'
                                : '⭕'}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p className={s.lessonName}>{lesson.data().lessonName}</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={s.lessonDescriptionContainer}>
                                <div style={{textAlign: 'left'}}>
                                    <Typography>{lesson.data().description}</Typography>
                                    <Typography><b>Reward: {lesson.data().reward}$</b></Typography>
                                </div>
                                {/*<button onClick={() => alert(lesson.data().theory)}>LessonTheory</button>*/}
                                <NavLink to={"/lesson"}
                                         state={{
                                             sectionName,
                                             lessonId: lesson.id,
                                             sectionProgress,
                                             lessonIndex: index,
                                             reward: lesson.data().reward,
                                             theory: lesson.data().theory,
                                             isBonus,
                                             isTest: false,
                                         }}>
                                    <button>start</button>
                                </NavLink>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </>
    )
        ;
}

export default Lessons;
