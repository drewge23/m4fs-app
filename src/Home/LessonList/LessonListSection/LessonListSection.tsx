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
import {NavLink} from "react-router-dom";
import {motion} from "framer-motion";

const LessonListSection = (props: any) => {
    let section = props.sectionProps
    return (
        <Card sx={{maxWidth: 600}}>
            <CardContent>
                <h1>{section.name}</h1>
                {section.lessons.map( (lesson: any) => {
                    return (
                        <Accordion key={lesson.id}>
                            <AccordionSummary
                                expandIcon={<StarBorderPurple500OutlinedIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{lesson.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{lesson.description}</Typography>
                                <div>
                                    <NavLink to={"/lesson"} state={{id: lesson.id}}> start </NavLink>
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
                        <StarBorderPurple500OutlinedIcon/>
                        <StarBorderPurple500OutlinedIcon/>
                        <StarBorderPurple500OutlinedIcon/>
                    </div>
                </Container>
            </CardActions>
        </Card>
    )
}

export default LessonListSection;
