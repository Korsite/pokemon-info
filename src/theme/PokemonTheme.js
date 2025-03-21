const lightPalette = {
    primary: { main: '#f44336' },
    secondary: { main: '#ffeb3b' },
    error: { main: '#d35c5c' },
    background: { default: '#ffffff' }
};

// Custom palette for Pokemon types colors
const customLightPalette = {
    waterType: '#4a90d9',
    fireType: '#f08030',
    grassType: '#78c850',
    electricType: '#f8d030',
    iceType: '#98d8d8',
    fightingType: '#c03028',
    poisonType: '#a040a0',
    groundType: '#e0c068',
    flyingType: '#a890f0',
    psychicType: '#f85888',
    bugType: '#a8b820',
    rockType: '#b8a038',
    ghostType: '#705898',
    darkType: '#705848',
    dragonType: '#7038f8',
    steelType: '#b8b8d0',
    fairyType: '#ee99ac',
    normalType: '#a8a878'
}

const darkPalette = {
    primary: { main: '#781710' },
    secondary: { main: '#ffeb3b' },
    error: { main: '#d35c5c' },
    background: { default: '#121212' }
};

// Custom palette for Pokemon types colors
const customDarkPalette = {
    waterType: '#63a8ff',    // Azul más claro
    fireType: '#ff9933',     // Naranja más vibrante
    grassType: '#90e070',    // Verde lima
    electricType: '#ffe600', // Amarillo neón
    iceType: '#a8e0e0',      // Cyan brillante
    fightingType: '#ff6b35', // Naranja intenso
    poisonType: '#c183c1',   // Morado pastel
    groundType: '#d4b886',   // Beige oscuro
    flyingType: '#9dbdff',   // Azul cielo
    psychicType: '#ff80ce',  // Rosa fluorescente
    bugType: '#8bc34a',      // Verde manzana
    rockType: '#d4c17d',     // Oro apagado
    ghostType: '#957fcd',    // Morado lavanda
    darkType: '#909090',     // Gris medio
    dragonType: '#9068fc',   // Morado eléctrico claro
    steelType: '#b8c7d0',    // Gris acero claro
    fairyType: '#ffb5c8',    // Rosa claro
    normalType: '#c0c0a8'    // Gris verdoso claro
}

export const PokemonTheme = {
    colorSchemes: {
        light: { palette: lightPalette, customPalette: customLightPalette },
        dark: { palette: darkPalette, customPalette: customDarkPalette }
    }
};

export const fonts =  {
    default: '"Press Start 2P", Arial, sans-serif',
    alternate: '"Comic Sans MS", cursive, sans-serif',
};
