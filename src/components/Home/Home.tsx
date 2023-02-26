import {FC} from "react";
import SectionList from "./SectionList";
import {useSelector} from "react-redux";
import HomeHeaderNav from "./HomeHeaderNav";
import {Box, Container, Grid} from "@mui/material";
import HomeSectionNav from "./HomeSectionNav";
import s from './home.module.css'

const Home: FC = ({signOut}: any) => {
    const money = useSelector((state: any) => state.money)

    return (
        <div>
            <HomeHeaderNav signOut={signOut}/>
            <Container className={s.main}>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <Box sx={{
                                position: 'fixed',
                                backgroundColor: 'lightblue',
                                height: '100%',
                            }}>
                                <HomeSectionNav/>
                            </Box>
                        </Grid>
                        <Grid item xs={6.5}>
                            <SectionList/>
                        </Grid>
                        <Grid item xs={3.5}>
                            <Box sx={{
                                backgroundColor: 'lightblue',
                                width: '100%',
                                height: '100%'
                            }}>

                            </Box>
                        </Grid>
                    </Grid>
            </Container>
        </div>
    )
}

export default Home;