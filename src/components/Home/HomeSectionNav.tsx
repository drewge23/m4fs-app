import {HashLink} from 'react-router-hash-link';
import {FC, useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import {useDocumentOnce} from "react-firebase-hooks/firestore";
import { getCountFromServer } from 'firebase/firestore';

//TODO: refactor
const HomeSectionNav: FC = () => {
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
            {/*@ts-ignore*/}
            {grade?.data().sections.map((section: any) => {
                let completionPercent = Math.round(
                    (progress[gradeNum - 1][section.name][0] +
                        progress[gradeNum - 1][section.name][1]) /
                    (section.lessonCount) * 80 +
                    (progress[gradeNum - 1][section.name][2] && 20 || 0))
                return (
                    <Box key={section.name}>
                        <HashLink smooth to={"#" + section.name}
                                  scroll={el => scrollWithOffset(el)}>
                            {section.name}
                        </HashLink>
                        <span>{" " + completionPercent + "%"}</span>
                    </Box>
                )
            })}
        </>
    )
}

export default HomeSectionNav;