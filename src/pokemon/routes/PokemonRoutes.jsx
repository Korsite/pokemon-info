import {PokemonLayout} from "../layout/PokemonLayout.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {ListOfPokemonPage} from "../pages/ListOfPokemonPage.jsx";
import {PokemonInfoPage} from "../pages/PokemonInfoPage.jsx";

export const PokemonRoutes = () => {
    return (
        <PokemonLayout>
            <Routes>
                <Route path="/pokemon-info" element={ <ListOfPokemonPage /> } />
                <Route path="/ByType" element={ <h1>By type</h1> } />
                <Route path="/ByRegion" element={ <h1>By region</h1> } />
                <Route path="/ByFavorites" element={ <h1>Favorites</h1> } />

                <Route path='/pokemon-info/:pokemonId' element={ <PokemonInfoPage/> } />
                <Route path="/*" element={ <Navigate to='/pokemon-info' /> } />
            </Routes>
        </PokemonLayout>
    )
}
