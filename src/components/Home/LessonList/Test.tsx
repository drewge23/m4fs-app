import React from 'react';
import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";
import {motion} from "framer-motion";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function Test({test, sectionName, testCompleted}: any) {
    return (
            <NavLink to={"/lesson"}
                     state={{
                         sectionName,
                         lessonId: test.id,
                         lessonIndex: 0,
                         reward: test.data().reward,
                         theory: test.data().theory, //?
                         isBonus: false,
                         isTest: true,
                     }}>
                <Box
                    component={motion.div}
                    style={{
                        width: 100, height: 100, borderRadius: '50%',
                        backgroundColor: testCompleted ? 'gold' : 'pink'
                    }}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                >
                    <EmojiEventsIcon sx={{marginTop: 4.5}}/>
                </Box>
            </NavLink>
    );
}

export default Test;