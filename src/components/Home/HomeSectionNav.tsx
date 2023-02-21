import {HashLink} from 'react-router-hash-link';
import {FC} from "react";
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import {useDocumentOnce} from "react-firebase-hooks/firestore";

//TODO: refactor
const HomeSectionNav: FC = () => {
    const gradeNum = useSelector((state: any) => state.grade)
    const progress = useSelector((state: any) => state.progress)

    const db = useSelector((state: any) => state.firebase.db)
    // @ts-ignore
    const [grade, loading] = useDocumentOnce(db.collection('lessons')
        .doc(`grade_${gradeNum}`))
    //get all grade's collections' length

    const scrollWithOffset = (el: any) => {
        const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
        const yOffset = -60;
        window.scrollTo({top: yCoordinate + yOffset, behavior: 'smooth'});
    }

    return (
        <>
            {/*@ts-ignore*/}
            {grade?.data().sections.map((sectionName: any) => {
                let completionPercent = Math.round(
                    (progress[gradeNum - 1][sectionName][0] +
                        progress[gradeNum - 1][sectionName][1]) /
                    (3 /*section.lessons.length + section.bonusLessons.length*/) * 80 +
                    (progress[gradeNum - 1][sectionName][2] && 20 || 0))
                return (
                    <Box key={sectionName}>
                        <HashLink smooth to={"#" + sectionName}
                                  scroll={el => scrollWithOffset(el)}>
                            {sectionName}
                        </HashLink>
                        <span>{" " + completionPercent + "%"}</span>
                    </Box>
                )
            })}
        </>
    )
}

export default HomeSectionNav;