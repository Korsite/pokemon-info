import {AppTheme} from "./theme/index.js";
import {AppRouter} from "./router/AppRouter.jsx";
import {MediaQueryProvider, PokemonsProvider} from "./pokemon/context/index.js";

export const PokemonInfoApp = () => {
    return (
        <AppTheme>
            <MediaQueryProvider>
                <PokemonsProvider>
                    <AppRouter/>
                </PokemonsProvider>
            </MediaQueryProvider>
        </AppTheme>
    )
}
