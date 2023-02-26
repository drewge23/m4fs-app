import {FC} from "react";
import SectionList from "./SectionList";
import {useSelector} from "react-redux";
import HomeHeader from "./HomeHeader";
import {Box, Container, Grid} from "@mui/material";
import HomeSectionNav from "./HomeSectionNav";
import s from './home.module.css'

const Home: FC = ({signOut}: any) => {
    const money = useSelector((state: any) => state.money)

    return (
        <div>
            <HomeHeader signOut={signOut}/>
            <Container sx={{width: '100%', maxWidth: 1600}}>
                <Box className={s.main}>
                    <div className={s.left}>
                        <HomeSectionNav/>
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