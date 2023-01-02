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
import {useEffect} from "react";
import {bonusLessonsCompleted, lessonsCompleted} from "../../../user/progressSlice";

const LessonList = (props: any) => {
    let grade = props.grade;
    let section = props.sectionProps
    const progress = useSelector((state: any) => state.progress[grade - 1].get(section.name));
    let [sectionProgress, bonusProgress, testCompleted, sectionCompleted, bonusCompleted] = progress;

    function isDisabled(index: number) {
        return sectionProgress < index;
    }

    function isGold(index: number) {
        return sectionProgress > index;
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if (sectionProgress >= section.lessons.length) {
            dispatch(lessonsCompleted({grade: grade - 1, section: section.name}))
        }
        if (bonusProgress >= section.bonusLessons.length) {
            dispatch(bonusLessonsCompleted({grade: grade - 1, section: section.name}))
        }
    }, [sectionProgress, bonusProgress])

    return (
        <Card sx={{maxWidth: 600}}>
            <CardContent>
                <h1>{section.name}</h1>

                {/*LESSONS*/}
                {section.lessons.map((lesson: any, index: number) => {
                    return (
                        <Accordion key={lesson.id} disabled={isDisabled(index)}>
                            <AccordionSummary
                                expandIcon={isGold(index)
                                    ? <StarIcon/>
                                    : <StarBorderPurple500OutlinedIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{lesson.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{lesson.description}</Typography>
                                <div>
                                    <NavLink to={"/lesson"}
                                             state={{
                                                 grade: grade,
                                                 sectionName: section.name,
                                                 sectionProgress: sectionProgress,
                                                 bonusProgress: bonusProgress,

                                                 lessonIndex: index,
                                                 isBonus: false,
                                                 id: lesson.id,
                                                 reward: lesson.reward,
                                             }}> start </NavLink>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}

                {/*BONUS LESSONS*/}
                <h3>bonus lessons</h3>
                {section.bonusLessons.map((lesson: any, index: number) => {
                    return (
                        <Accordion key={lesson.id}
                            disabled={
                                 (sectionProgress / section.lessons.length) <= (index / section.bonusLessons.length)
                            }>
                            <AccordionSummary
                                expandIcon={
                                    bonusProgress > index
                                        ? <StarIcon/>
                                        : <StarBorderPurple500OutlinedIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{lesson.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{lesson.description}</Typography>
                                <div>
                                    <NavLink to={"/lesson"}
                                             state={{
                                                 grade: grade,
                                                 sectionName: section.name,
                                                 sectionProgress: sectionProgress,
                                                 bonusProgress: bonusProgress,

                                                 lessonIndex: index,
                                                 isBonus: true,
                                                 id: lesson.id,
                                                 reward: lesson.reward,
                                             }}> start </NavLink>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </CardContent>
            <CardActions>
                <Container>
                    <Box
                        component={motion.div}
                        style={{width: 100, height: 100, backgroundColor: 'pink', borderRadius: '50%'}}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                    >
                        <EmojiEventsIcon sx={{marginTop: 4.5}}/>
                    </Box>
                    <div>
                        {sectionCompleted ? <StarIcon/> : <StarBorderPurple500OutlinedIcon/>}
                        {bonusCompleted ? <StarIcon/> : <StarBorderPurple500OutlinedIcon/>}
                        {testCompleted ? <StarIcon/> : <StarBorderPurple500OutlinedIcon/>}
                    </div>
                </Container>
            </CardActions>
        </Card>
    )
}

export default LessonList;
