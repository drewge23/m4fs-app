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
                     testCompleted
                 }}
                 style={{
                     width: '100%',
                     textDecoration: 'none'
                 }}
        >
            <Box
                component={motion.div}
                style={{
                    width: 100, height: 100,
                    margin: '0 auto 1rem auto',
                    borderRadius: '50%',
                    backgroundColor: testCompleted ? 'white' : 'lightcoral',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1.75rem',
                    border: '0.5px solid gray',
                }}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
            >
                {testCompleted ? '🏆' : '❔'}
            </Box>
        </NavLink>
    );
}

export default Test;