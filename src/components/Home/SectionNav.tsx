import {HashLink} from 'react-router-hash-link';
import {FC} from "react";
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import {useDocumentOnce} from "react-firebase-hooks/firestore";
import s from './home.module.css'

const SectionNav: FC = () => {
    const gradeNum = useSelector((state: any) => state.grade)
    const progress = useSelector((state: any) => state.progress)

    const db = useSelector((state: any) => state.firebase.db)
    // @ts-ignore
    const [grade, loading] = useDocumentOnce(db.collection('lessons')
        .doc(`grade_${gradeNum}`))

    const scrollWithOffset = (el: any) => {
        const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
        const yOffset = -60;
        window.scrollTo({top: yCoordinate + yOffset, behavior: 'smooth'});
    }

    return (
        <>
            <Box className={s.leftContainer}>
                {/*@ts-ignore*/}
                {grade?.data().sections.map((section: any) => {
                    let completionPercent = progress[gradeNum - 1][section.name]
                        ? Math.round(
                            (progress[gradeNum - 1][section.name][0]
                                + ((progress[gradeNum - 1][section.name][1] < 0) ? 0 : progress[gradeNum - 1][section.name][1]))
                            / (section.lessonCount)
                            * 80
                            + (progress[gradeNum - 1][section.name][4] && 20 || 0))
                        : 0
                    return (
                        <div key={section.name} className={s.leftLinks}>
                            <HashLink smooth to={"#" + section.name}
                                      scroll={el => scrollWithOffset(el)}>
                                {section.name}
                                <span className={s.percent}>{completionPercent + "%"}</span>
                            </HashLink>
                        </div>
                    )
                })}
            </Box>
        </>
    )
}

export default SectionNav;