import {useState} from 'react';
import {Box, Typography, IconButton, useTheme} from '@mui/material';
import {ArrowForwardIos} from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PropTypes from "prop-types";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const ImageCarousel = ({pokemon}) => {
    const {name, types, imagesTest} = pokemon;
    const totalImages = imagesTest.length; // Extract Constant
    const [currentIndex, setCurrentIndex] = useState(0);
    const theme = useTheme();
    const colorOfBackgroundBasedOnType = theme.customPalette[`${types[0]}Type`];

    const [imagesOfPokemon, setImagesOfPokemon] = useState(imagesTest["generation-i"]);
    const goToNextImage = () => { // Rename Function
        setCurrentIndex((previousIndex) => previousIndex === Object.keys(imagesOfPokemon.images).length ? 0 : previousIndex + 1)
        console.log(imagesOfPokemon)
        // number of objects in propertie aimgesOfPokemon.images
    };

    const goToPreviousImage = () => { // Rename Function
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    const handleOpenImages = ({generationName, versionName}) => {
        const imagesToDisplay = imagesTest[generationName][versionName]
        setImagesOfPokemon(imagesToDisplay)

        console.log(imagesOfPokemon)
    }


    const renderDots = () => { // Extract Function
        return imagesOfPokemon ? Object.values(imagesOfPokemon).map((_, index) => (
            <Box
                key={index}
                sx={{
                    height: 10,
                    width: 10,
                    borderRadius: '50%',
                    backgroundColor: index === currentIndex ? theme.palette.primary.main : theme.palette.secondary.main,
                    margin: 1
                }}
            />
        )) : null
    };

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            backgroundColor: colorOfBackgroundBasedOnType,
            position: 'relative',
            borderRadius: "2%",
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTopRightRadius: "2%",
            }}>
                <Typography sx={{flexGrow: 1, textAlign: 'center', mt: 1.5}}
                            variant="h6">{name} {imagesOfPokemon.generation}</Typography>
                <NestedMenu listOfPokemonImages={imagesTest} handleOpenImages={handleOpenImages}/>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTopRightRadius: "2%",
            }}>
                <Typography sx={{flexGrow: 1, textAlign: 'center'}} variant="h6">{imagesOfPokemon.gameName}</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <IconButton color="primary" onClick={goToPreviousImage} size="large"
                            sx={{position: 'absolute', left: 0, ml: 1}}>
                    <ArrowBackIosNewIcon fontSize='inherit'/>
                </IconButton>
                {/*{*/}
                {/*    <img src={imagesOfPokemon ? Object.values(imagesOfPokemon.images)[currentIndex] : ''}*/}
                {/*         alt="Pokemon" width="90%"/>*/}
                {/*}*/}

                <IconButton color="primary" onClick={goToNextImage} size="large"
                            sx={{position: 'absolute', right: 0, mr: 1}}>
                    <ArrowForwardIos fontSize='inherit'/>
                </IconButton>
            </Box>
            <Box mb={1.5} sx={{display: 'flex', justifyContent: 'center'}}>
                {renderDots()} {/* Call extracted function */}
            </Box>
        </Box>
    );
};
ImageCarousel.propTypes = {
    pokemon: PropTypes.shape({
        name: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,

}

/* an example of listoFpokemonImages
        "versions": {
            "generation-i": {
                "red-blue": {
                    "back_default": null,
                    "back_gray": null,
                    "back_transparent": null,
                    "front_default": null,
                    "front_gray": null,
                    "front_transparent": null
                },
                "yellow": {
                    "back_default": null,
                    "back_gray": null,
                    "back_transparent": null,
                    "front_default": null,
                    "front_gray": null,
                    "front_transparent": null
                }
            },
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
                "silver": {
                    "back_default": null,
                    "back_shiny": null,
                    "front_default": null,
                    "front_shiny": null,
                    "front_transparent": null
                }
            }
*/

/**
 * Component to display a nested menu with options to show images of a Pokémon
 * @param listOfPokemonImages
 * @param handleOpenImages
 * @returns {JSX.Element}
 * @constructor
 */
const NestedMenu = ({ listOfPokemonImages, handleOpenImages }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [allOpen, setAllOpen] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenSubmenu(null);
    };

    const handleSubmenuClick = (generationName, event) => {
        event.stopPropagation();
        setOpenSubmenu(openSubmenu === generationName ? null : generationName);
    };

    const handleToggleAll = (e) => {
        e.stopPropagation();
        setAllOpen(!allOpen);
        setOpenSubmenu(null); // Resetea submenús individuales
    };

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ position: 'absolute', right: 0 }}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ maxHeight: 500 }}
            >
                <MenuItem onClick={handleToggleAll}>
                    <ListItemText primary={allOpen ? "Close All" : "Open All"} />
                    <ListItemIcon sx={{ justifyContent: "flex-end" }}>
                        {allOpen ? <LockIcon /> : <LockOpenIcon />}
                    </ListItemIcon>
                </MenuItem>

                {Object.keys(listOfPokemonImages).map((generationName, generationIndex) => (
                    <div key={generationName}>
                        <MenuItem onClick={(e) => handleSubmenuClick(generationName, e)}>
                            <ListItemText primary={generationName} />
                            <ListItemIcon sx={{ justifyContent: "flex-end" }}>
                                {openSubmenu === generationName ? <ExpandLessIcon /> : <ExpandMore />}
                            </ListItemIcon>
                        </MenuItem>

                        <Collapse in={allOpen || openSubmenu === generationName}>
                            <List disablePadding>
                                {Object.keys(listOfPokemonImages[generationName]).map((versionName, versionIndex) => (
                                    <MenuItem
                                        key={versionName}
                                        sx={{ pl: 4 }}
                                        onClick={() => {
                                            handleClose();
                                            handleOpenImages({
                                                generationName,
                                                versionName
                                            });
                                        }}
                                    >
                                        {versionName}
                                    </MenuItem>
                                ))}
                            </List>
                        </Collapse>
                    </div>
                ))}
            </Menu>
        </>
    );
};

NestedMenu.propTypes = {
    listOfPokemonImages: PropTypes.object.isRequired,
    handleOpenImages: PropTypes.func.isRequired
}

MenuItem.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node
};
