import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';

export const InfoTabs = ({ pokemon }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={selectedTab} onChange={handleTabChange} aria-label="info tabs">
                <Tab label="Info" />
                <Tab label="Abilities" />
                <Tab label="Example" />
            </Tabs>
            <Box sx={{ padding: '1rem', backgroundColor: '#e0f7fa', marginTop: '1rem' }}>
                {selectedTab === 0 && (
                    <Box>
                        <Typography variant="h6">Basic</Typography>
                        <Typography>Type: {pokemon.type}</Typography>
                        <Typography>Weight: {pokemon.weight}</Typography>
                        <Typography>Height: {pokemon.height}</Typography>
                    </Box>
                )}
                {selectedTab === 1 && (
                    <Box>
                        <Typography variant="h6">Abilities</Typography>
                    </Box>
                )}
                {selectedTab === 2 && (
                    <Box>
                        <Typography variant="h6">Example</Typography>
                        <Typography>Some example content</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
