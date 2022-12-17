import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Box, Button, Card,
    CardActions,
    CardContent,
    Container,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import {NavLink} from "react-router-dom";
import {motion} from "framer-motion";

const LessonListSection = () => {
    return (
        <Card sx={{maxWidth: 600}}>
            <CardContent>
                <h1>Addition</h1>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<StarBorderPurple500OutlinedIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Basic addition</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            You'll learn how to find a sum of the numbers below 10
                        </Typography>
                        <div>
                            <NavLink to={"/lesson"}> start </NavLink>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<StarBorderPurple500OutlinedIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Addition: level 2</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            You'll learn the "Stolbik" method
                        </Typography>
                        <div>
                            <NavLink to={"/lesson"}> start </NavLink>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled>
                    <AccordionSummary
                        expandIcon={<StarBorderPurple500OutlinedIcon/>}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Bonus level 1</Typography>
                    </AccordionSummary>
                </Accordion>
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
                        <StarBorderPurple500OutlinedIcon />
                        <StarBorderPurple500OutlinedIcon />
                        <StarBorderPurple500OutlinedIcon />
                    </div>
                </Container>
            </CardActions>
        </Card>
    )
}

export default LessonListSection;
