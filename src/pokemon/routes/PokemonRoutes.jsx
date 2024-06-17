import {PokemonLayout} from "../layout/PokemonLayout.jsx";
import {Route, Routes} from "react-router-dom";
import {PokemonPage} from "../pages/PokemonPage.jsx";

export const PokemonRoutes = () => {
    return (
        <PokemonLayout>
            <Routes>
                <Route path="/" element={ <PokemonPage /> } />
            </Routes>
        </PokemonLayout>
    )
}
