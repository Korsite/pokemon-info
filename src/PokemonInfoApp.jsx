import {AppTheme} from "./theme/index.js";
import {AppRouter} from "./router/AppRouter.jsx";
import {MediaQueryProvider} from "./pokemon/context/MediaQueryProvider.jsx";

export const PokemonInfoApp = () => {
    return (
        <AppTheme>
            <MediaQueryProvider>
                <AppRouter />
            </MediaQueryProvider>
        </AppTheme>
    )
}
