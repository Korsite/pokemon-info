import { useState } from 'react';
import {useGoToNextAndPrevious} from "./useGoToNextAndPrevious.js";

const safeObjectKeys = (obj) => Object.keys(obj || {});

// Función helper para aplanar imágenes recursivamente
const flattenImages = (imagesObj) => {
    let images = [];

    const traverse = (obj) => {
        Object.entries(obj || {}).forEach(([key, value]) => {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                traverse(value);
            } else if (typeof value === 'string') {
                images.push({
                    url: value,
                    type: key // Guardamos el tipo de imagen (front_default, animated, etc)
                });
            }
        });
    };

    traverse(imagesObj);
    return images;
};

export const useImageCarousel = ({ allImagesAvailable }) => {
    // Validación inicial de datos
    const hasValidImages = allImagesAvailable && safeObjectKeys(allImagesAvailable).length > 0;

    // Obtener claves iniciales
    const firstGeneration = safeObjectKeys(allImagesAvailable)[0] || '';
    const firstVersion = safeObjectKeys(allImagesAvailable?.[firstGeneration])[0] || '';

    // Estado de las imágenes
    const [imagesOfPokemon, setImagesOfPokemon] = useState({
        generationName: firstGeneration,
        versionName: firstVersion,
        images: allImagesAvailable?.[firstGeneration]?.[firstVersion] || {},
        flatImages: flattenImages(allImagesAvailable?.[firstGeneration]?.[firstVersion] || {})
    });


    // Lógica de navegación
    const lenghtOfImages = imagesOfPokemon.flatImages.length;
    const { index, nextIndex, previousIndex, setIndex } = useGoToNextAndPrevious(lenghtOfImages - 1);

    // Manejo de cambio de imágenes actualizado
    const handleOpenImages = ({ generationName, generationIndex, versionName, versionIndex}) => {
        const newImages = allImagesAvailable?.[generationName]?.[versionName] || {};

        setImagesOfPokemon({
            generationName,
            generationIndex,
            versionName,
            versionIndex,
            images: newImages,
            flatImages: flattenImages(newImages)
        });
        setIndex(0);
    };

    return {
        hasValidImages,
        imagesOfPokemon,
        index,
        nextIndex,
        previousIndex,
        handleOpenImages,
        lenghtOfImages
    };
};