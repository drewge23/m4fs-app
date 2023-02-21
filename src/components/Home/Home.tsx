import {FC} from "react";
import {NavLink} from "react-router-dom";
import SectionList from "./SectionList";
import {useSelector} from "react-redux";
import HomeHeaderNav from "./HomeHeaderNav";
import {Box, Container, Grid} from "@mui/material";
import HomeSectionNav from "./HomeSectionNav";

const Home: FC = ({signOut}: any) => {
    const money = useSelector((state: any) => state.money)

    return (
        <div>
            <HomeHeaderNav signOut={signOut}/>
            <Box sx={{marginTop: 10}}>
                <Container sx={{width: 1200}}>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <Box sx={{
                                position: 'fixed',
                                backgroundColor: 'lightblue',
                                height: '100%'
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
            </Box>
        </div>
    )
}

export default Home;