import {useFetch} from "../hooks/useFetch.js";
import {Route, Routes} from "react-router-dom";
import {PokemonRoutes} from "../pokemon/routes/PokemonRoutes.jsx";

export const AppRouter = () => {

    return (
        <Routes>
            <Route path='/*' element={ <PokemonRoutes /> } />
        </Routes>
    )
}
