import {FC} from "react";
import {Container, Grid} from "@mui/material";
import LessonList from "./LessonList/LessonList";
import grades from "../../lessons/grades";

const SectionList: FC = () => {
    return (
        <Container>
            {grades.map(grade => {
                return (
                    <Grid container spacing={2} key={grade.id}>
                        <h1>{grade.name}</h1>
                        {grade.lessonSections.map(section => {
                                return (
                                    <Grid item xs={6} md={6}  key={section.id}>
                                        <LessonList sectionProps={section} grade={grade.id}/>
                                    </Grid>
                                )
                            }
                        )}
                    </Grid>
                )
            })}
        </Container>
    )
}

export default SectionList;