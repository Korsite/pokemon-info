import {PokemonLayout} from "../layout/PokemonLayout.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {PokemonInfoPage} from "../pages/PokemonInfoPage.jsx";

export const PokemonRoutes = () => {
    return (
        <PokemonLayout>
            <Routes>
                <Route path="/PokemonInfo" element={ <PokemonInfoPage /> } />
                <Route path="/ByType" element={ <h1>By type</h1> } />
                <Route path="/ByRegion" element={ <h1>By region</h1> } />
                <Route path="/ByFavorites" element={ <h1>Favorites</h1> } />

                <Route path="/*" element={ <Navigate to='/PokemonInfo' /> } />
            </Routes>
        </PokemonLayout>
    )
}
