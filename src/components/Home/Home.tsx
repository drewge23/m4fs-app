import {FC} from "react";
import SectionList from "./SectionList";
import {useSelector} from "react-redux";
import Header from "./Header";
import {Box, Container} from "@mui/material";
import SectionNav from "./SectionNav";
import s from './home.module.css'
import Streak from "./Streak";
import Stars from "./Stars";
import MoneySnackbar from "../MoneySnackbar";

const Home: FC = ({signOut}: any) => {
    const snackbar = useSelector((state: any) => state.utils.snackbar)

    return (
        <div>
            <MoneySnackbar snackbar={snackbar}/>
            <Header signOut={signOut}/>
            <Container sx={{width: '100%', maxWidth: 1600}}>
                <Box className={s.main}>
                    <Box className={s.left} sx={{display: {xs: 'none', sm: 'flex'}}}>
                        <SectionNav/>
                    </Box>
                    <Box className={s.center}>
                        <SectionList/>
                    </Box>
                    <Box className={s.right} sx={{display: {xs: 'none', md: 'flex'}}}>
                        <Box className={s.rightContainer} sx={{display: {xs: 'none', md: 'flex'}}}>
                            <Streak/>
                            <Stars/>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Home;