import {FC} from "react";
import LessonList from "./LessonList/LessonList";
import grades from "../../lessons/grades";
import {useDispatch, useSelector} from "react-redux";
import {decrementGrade, incrementGrade} from "./gradeSlice";

const SectionList: FC = () => {
    const gradeNum = useSelector( (state: any) => state.grade)

    return (
        <>
            {grades.map(grade => {
                if (grade.id === gradeNum) {
                    return (
                        // <Grid container spacing={2} key={grade.id}>
                        <div key={grade.id}>
                            <h1>{grade.name}</h1>
                            {grade.lessonSections.map(section => {
                                    return (
                                        // <Grid item xs={6} md={6} key={section.id}>
                                            <LessonList sectionProps={section} grade={grade.id} key={section.id}/>
                                        // </Grid>
                                    )
                                }
                            )}
                        </div>
                        // </Grid>
                    )
                }
            })}
        </>
    )
}

export default SectionList;