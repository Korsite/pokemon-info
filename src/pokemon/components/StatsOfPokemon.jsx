import {memo} from "react";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";

export const StatsOfPokemon = memo(({ stats }) => {
    const limitedStats = stats.slice(0, 3); // limit to 3 stats

    return (
        <>
            {
                limitedStats.map((statObj, index) => (
                <Grid item key={index} xs={12}>
                    <Typography>
                        {StatsIcons[index].icon} {StatsIcons[index].name}:
                        {statObj.base_stat}
                    </Typography>
                </Grid>
            ))
            }
        </>
    )
})

const StatsIcons = [
    {
        name: 'HP',
        icon: '❤️'
    },
    {
        name: 'ATTACK',
        icon: '⚔️'
    },
    {
        name: 'DEFENSE',
        icon: '🛡️'
    },
    {
        name: 'SPECIAL-ATTACK',
        icon: '🔥'
    },
    {
        name: 'SPECIAL-DEFENSE',
        icon: '🛡️'
    },
    {
        name: 'SPEED',
        icon: '🏃'
    }
]