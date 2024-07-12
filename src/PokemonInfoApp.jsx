import {AppTheme} from "./theme/index.js";
import {AppRouter} from "./router/AppRouter.jsx";
import {MediaQueryProvider, PokemonHooksProvider} from "./pokemon/context/index.js";

export const PokemonInfoApp = () => {
    return (
        <AppTheme>
            <MediaQueryProvider>
                <PokemonHooksProvider>
                    <AppRouter/>
                </PokemonHooksProvider>
            </MediaQueryProvider>
        </AppTheme>
    )
}
