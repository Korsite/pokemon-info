import {usePokemonClicked} from "../hooks/index.js";
import {ImageCarousel, InfoTabs} from "../views/PokemonInfoPage/index.js";
import {CssBaseline} from "@mui/material";
import Grid from '@mui/material/Grid2';

export const PokemonInfoPage = () => {
    const {lastPokemonClicked} = usePokemonClicked();

    return (
        <>
            <CssBaseline/>
            {lastPokemonClicked && (
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <ImageCarousel pokemon={{...lastPokemonClicked}}/>
                    </Grid>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <InfoTabs pokemon={lastPokemonClicked}/>
                    </Grid>
                </Grid>
            )}
        </>
    );
};