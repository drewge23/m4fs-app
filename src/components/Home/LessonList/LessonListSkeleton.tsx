import React from 'react';
import s from "./lessonList.module.css";
import {Skeleton} from "@mui/material";

const COLOR = 'var(--white-color)'

const SkeletonLine = ({height}: any) => {
    return <Skeleton sx={{ bgcolor: COLOR }} variant="rounded" width={500} height={height} />
}

function LessonListSkeleton(props: any) {
    return (
        <div className={s.skeleton}>
            <SkeletonLine height={70} />
            <SkeletonLine height={50} />
            <SkeletonLine height={50} />
            <SkeletonLine height={60} />
            <SkeletonLine height={50} />
            <Skeleton sx={{ bgcolor: COLOR }} variant="circular" width={100} height={100} />
        </div>
    );
}

export default LessonListSkeleton;