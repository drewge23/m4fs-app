import {NavLink} from "react-router-dom";
import {FC} from "react";
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import grades from "../lessons/grades";

const SectionNav: FC = () => {
    const gradeNum = useSelector((state: any) => state.grade)
    return (
        <>
            {grades.map(grade => {
                    if (grade.id === gradeNum) {
                        return (
                            grade.lessonSections.map(section => (
                                <Box key={section.id}>
                                    <NavLink to={'/'}>
                                        {section.name}
                                    </NavLink>
                                </Box>
                            ))
                        )
                    }
                }
            )}
        </>
    )
}

export default SectionNav;