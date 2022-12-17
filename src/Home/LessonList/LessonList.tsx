import {FC} from "react";
import {Container, Grid} from "@mui/material";
import LessonListSection from "./LessonListSection/LessonListSection";

const LessonList: FC = () => {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                    <LessonListSection/>
                </Grid>
                <Grid item xs={6} md={6}>
                    <LessonListSection/>
                </Grid>
                <Grid item xs={6} md={6}>
                    <LessonListSection/>
                </Grid>
                <Grid item xs={6} md={6}>
                    <LessonListSection/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LessonList;