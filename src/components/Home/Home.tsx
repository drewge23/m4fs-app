import {FC} from "react";
import SectionList from "./SectionList";
import {useSelector} from "react-redux";
import Header from "./Header";
import {Box, Container, Grid} from "@mui/material";
import SectionNav from "./SectionNav";
import s from './home.module.css'

const Home: FC = ({signOut}: any) => {
    const money = useSelector((state: any) => state.money)

    return (
        <div>
            <Header signOut={signOut}/>
            <Container sx={{width: '100%', maxWidth: 1600}}>
                <Box className={s.main}>
                    <div className={s.left}>
                        <SectionNav/>
                    </div>
                    <div className={s.center}>
                        <SectionList/>
                    </div>
                    <Box className={s.right}></Box>
                </Box>
            </Container>
        </div>
    )
}

export default Home;