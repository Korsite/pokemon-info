/*
    This function removes all null attributes from an object.
 */
export const removeNullAttributes = (obj) => {
    if (Array.isArray(obj)) {
        const processedArray = obj.map(removeNullAttributes).filter(item => item !== undefined);
        return processedArray.length === 0 ? undefined : processedArray;
    } else if (obj !== null && typeof obj === 'object') {
        const newObj = Object.entries(obj).reduce((acc, [key, value]) => {
            const processedValue = removeNullAttributes(value);
            if (processedValue === null || processedValue === undefined) {
                return acc;
            }
            if (typeof processedValue === 'object' && Object.keys(processedValue).length === 0) {
                return acc;
            }
            acc[key] = processedValue;
            return acc;
        }, {});
        return Object.keys(newObj).length === 0 ? undefined : newObj;
    } else {
        return obj;
    }
};

const testObject = {
    "versions": {
        "generation-ii": {
            "crystal": {
                "back_default": null,
                "back_shiny": null,
                "back_shiny_transparent": null,
                "back_transparent": null,
                "front_default": null,
                "front_shiny": null,
                "front_shiny_transparent": null,
                "front_transparent": null
            },
            "gold": {
                "back_default": null,
                "back_shiny": null,
                "front_default": null,
                "front_shiny": null,
                "front_transparent": null
            },
        },
        "generation-v": {
            "black-white": {
                "animated": {
                    "back_default": null,
                    "back_female": null,
                    "back_shiny": null,
                    "back_shiny_female": null,
                    "front_default": null,
                    "front_female": null,
                    "front_shiny": null,
                    "front_shiny_female": null
                },
                "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/10218.png",
                "back_female": null,
                "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/shiny/10218.png",
                "back_shiny_female": null,
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/10218.png",
                "front_female": null,
                "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/10218.png",
                "front_shiny_female": null
            }
        },
        "generation-vi": {
            "omegaruby-alphasapphire": {
                "front_default": null,
                "front_female": null,
                "front_shiny": null,
                "front_shiny_female": null
            },
            "x-y": {
                "front_default": null,
                "front_female": null,
                "front_shiny": null,
                "front_shiny_female": null
            }
        },
        "generation-viii": {
            "icons": {
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/844-gmax.png",
                "front_female": null
            }
        }
    }
}
// solo muestra los atributos que no son null y no son undefined
console.log(removeNullAttributes(testObject))