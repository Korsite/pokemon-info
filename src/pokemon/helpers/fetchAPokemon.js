import {capitalizeAWord} from "./capitalizeAWord.js";
import {checkIfImageIsAvailable} from "./checkIfImageIsAvailable.js";
import {removeNullAttributes} from "./removeNullAttributes.js";

/**
 * Fetch a Pokémon from the API and returns an object with the data
 * @param url
 * @param signal
 * @returns {Promise<{isLoading: boolean, image: ({}|*), types: *, stats: *, moves: *, name: *, id}>}
 */
export const fetchAPokemon = async (url, signal) => {
    try {
        const response = await fetch(url, {signal});
        const data = await response.json();

        //
        let imagesTest = {...data.sprites.versions}
        imagesTest = removeNullAttributes(imagesTest)
        return {
            id: data.id,
            name: capitalizeAWord(data.name),
            image: checkIfImageIsAvailable(data.sprites.other['official-artwork'].front_default),
            images: [
                checkIfImageIsAvailable(data.sprites.front_default),
                checkIfImageIsAvailable(data.sprites.back_default),
                checkIfImageIsAvailable(data.sprites.front_shiny),
                checkIfImageIsAvailable(data.sprites.back_shiny)
            ],
            imagesTest,
            types: data.types.map((type) => type.type.name),
            moves: data.moves,
            stats: data.stats,
            isLoading: false
        };

    } catch (error) {
        // do not log error if fetch was aborted
        if (!signal.aborted) {
            console.error('Error fetching Pokémon: ', error);
        }
    }
}