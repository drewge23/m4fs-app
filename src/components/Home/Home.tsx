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
                    <div className={s.left}>
                        <SectionNav/>
                    </div>
                    <div className={s.center}>
                        <SectionList/>
                    </div>
                    <Box className={s.right}>
                        <div className={s.rightContainer}>
                            <Streak/>
                            <Stars/>
                        </div>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Home;