import React, {useState} from 'react';
import {Box, Typography, Button, IconButton} from '@mui/material';
import { ArrowForwardIos, Menu} from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export const ImageCarousel = ({pokemon}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % pokemon.images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + pokemon.images.length) % pokemon.images.length);
    };

    return (
        <Box sx={{width: '100%', height: '100%', backgroundColor: '#f0f0f0', position: 'relative'}}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#ccc',
                padding: '0.5rem'
            }}>
                <Typography sx={{ flexGrow: 1, textAlign: 'center' }} variant="h6">{pokemon.name}</Typography>
                <IconButton variant='contained' sx={{backgroundColor: '#afaeae'}}>
                    <KeyboardArrowDownIcon fontSize='inherit' />
                </IconButton>
            </Box>
            <Box
                ml={2}
                mr={2}
                sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}>
                <IconButton onClick={handlePrev} size='large' sx={{position: 'absolute', left: 0}}>
                    <ArrowBackIosNewIcon fontSize='inherit'/>
                </IconButton>

                <img src={pokemon.images[currentIndex]} alt="Pokemon" width='90%'/>

                <IconButton onClick={handleNext} size='large' sx={{position: 'absolute', right: 0}}>
                    <ArrowForwardIos fontSize='inherit'/>
                </IconButton>
            </Box>
            <Box mb={1.5} sx={{display: 'flex', justifyContent: 'center'}}>
                {pokemon.images.map((_, index) => (
                    <Box key={index} sx={{
                        width: 15,
                        height: 15,
                        borderRadius: '50%',
                        backgroundColor: index === currentIndex ? 'black' : '#ccc',
                        margin: '0.5rem'
                    }}/>
                ))}
            </Box>
        </Box>
    );
};
