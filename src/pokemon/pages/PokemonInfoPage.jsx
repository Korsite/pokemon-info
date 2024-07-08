import {useParams} from "react-router-dom";

export const PokemonInfoPage = () => {
    const { pokemonId } = useParams()
    return (
        <div>{ pokemonId }</div>
    )
}
