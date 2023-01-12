import {HashLink} from 'react-router-hash-link';
import {FC} from "react";
import {Box, Link} from "@mui/material";
import {useSelector} from "react-redux";
import grades from "../lessons/grades";

const SectionNav: FC = () => {
    const gradeNum = useSelector((state: any) => state.grade)
    const progress = useSelector((state: any) => state.progress)

    const scrollWithOffset = (el: any) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -60;
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
    }

    return (
        <>
            {grades.map(grade => {
                    if (grade.id === gradeNum) {
                        return (
                            grade.lessonSections.map(section => {
                                let comletionPercent = Math.round(
                                 (progress[grade.id - 1].get(section.name)[0] +
                                    progress[grade.id - 1].get(section.name)[1]) /
                                    (section.lessons.length + section.bonusLessons.length) * 80 +
                                    (progress[grade.id - 1].get(section.name)[2] && 20 || 0))
                                return (
                                    <Box key={section.id}>
                                        <HashLink smooth to={"#" + section.name}
                                                  scroll={el => scrollWithOffset(el)}>
                                            {section.name}
                                        </HashLink>
                                        <span>{" " + comletionPercent + "%"}</span>
                                    </Box>
                                )
                            })
                        )
                    }
                }
            )}
        </>
    )
}

export default SectionNav;