import {usePokemonClicked} from "../hooks/index.js";
import {ImageCarousel, InfoTabs} from "../views/PokemonInfoPage/index.js";
import Grid from "@mui/material/Unstable_Grid2";
import {CssBaseline} from "@mui/material";

export const PokemonInfoPage = () => {
    const {lastPokemonClicked} = usePokemonClicked();

    return (
        <>
            <CssBaseline/>
            {lastPokemonClicked && (
                <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                        <ImageCarousel pokemon={{...lastPokemonClicked}}/>
                    </Grid>
                    <Grid xs={12} md={8}>
                        <InfoTabs pokemon={lastPokemonClicked}/>
                    </Grid>
                </Grid>
            )}
        </>
    );
};