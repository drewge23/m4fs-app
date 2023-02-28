import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import {NavLink} from "react-router-dom";

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
                            <Typography>{lesson.data().lessonName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{lesson.data().description}</Typography>
                            {/*<button onClick={() => alert(lesson.data().theory)}>Theory</button>*/}
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
                                     }}> start </NavLink>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </>
    )
        ;
}

export default Lessons;
