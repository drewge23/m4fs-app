import {FC} from "react";
import LessonList from "./LessonList/LessonList";
import {useSelector} from "react-redux";
import {useDocumentOnce} from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

//TODO: refactor
const SectionList: FC = () => {
    const gradeNum = useSelector((state: any) => state.grade)
    const db = useSelector((state: any) => state.firebase.db)

    const gradeRef = db.collection('lessons').doc(`grade_${gradeNum}`)
    // @ts-ignore
    const [grade, loading] = useDocumentOnce(gradeRef)

    return (
        <div>
            <h1>Grade {gradeNum}</h1>
            {/*// @ts-ignore*/}
            {!loading && grade?.data().sections.map((section: any) => {
                    return (
                        <LessonList sectionName={section.name} key={section.name}/>
                    )
                }
            )}
        </div>
    )
}

export default SectionList;