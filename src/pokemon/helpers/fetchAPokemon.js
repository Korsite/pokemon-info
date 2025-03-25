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

        // Procesamiento rápido de imágenes
        const processImages = (versions) => {
            const result = {};
            for (const [generation, data] of Object.entries(versions)) {
                if (data) result[generation] = removeNullAttributes(data);
            }
            return result;
        };

        let imagesTest = {...data.sprites.versions}
        imagesTest = removeNullAttributes(imagesTest)

        return {
            id: data.id,
            name: capitalizeAWord(data.name),
            previewImage: checkIfImageIsAvailable(data.sprites.other['official-artwork'].front_default),
            allImagesAvailable: imagesTest,
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