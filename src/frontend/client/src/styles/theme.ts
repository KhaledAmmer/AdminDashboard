import { ThemeOptions } from '@mui/material';

type Tokens = {
  [key in 'gray' | 'primary' | 'secondary']: { [key: number]: string };
};

declare module '@mui/material/styles' {
  interface PaletteColor {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
    0: string;
    10: string;
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
  }
}

export const tokensDark: Tokens = {
  gray: {
    0: '#ffffff',
    10: '#f6f6f6',
    50: '#f0f0f0',
    100: '#e0e0e0',
    200: '#c2c2c2',
    300: '#a3a3a3',
    400: '#858585',
    500: '#666666',
    600: '#525252',
    700: '#3d3d3d',
    800: '#292929',
    900: '#141414',
    1000: '#000000',
  },
  primary: {
    // blue
    100: '#d3d4de',
    200: '#a6a9be',
    300: '#7a7f9d',
    400: '#4d547d',
    500: '#21295c',
    600: '#191F45',
    700: '#141937',
    800: '#0d1025',
    900: '#070812',
  },
  secondary: {
    // yellow
    50: '#f0f0f0',
    100: '#fff6e0',
    200: '#ffedc2',
    300: '#ffe3a3',
    400: '#ffda85',
    500: '#ffd166',
    600: '#cca752',
    700: '#997d3d',
    800: '#665429',
    900: '#332a14',
  },
};

function reverseTokens(tokensDark: Tokens) {
  const reversedTokens: Tokens = { gray: {}, primary: {}, secondary: {} };
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const { length } = keys;
    const reversedObj: { [key: number]: string } = {};
    for (let i = 0; i < length; i++) {
      reversedObj[Number(keys[i])] = values[length - i - 1];
    }
    reversedTokens[key as 'gray' | 'primary' | 'secondary'] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

export const themeSettings = (mode: 'dark' | 'light'): ThemeOptions => {
  return {
    spacing: 0,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '&::-webkit-scrollbar': {
            width: 10,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: tokensDark.secondary[500],
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: tokensDark.primary[300],
            borderRadius: 2,
          },
        },
      },
    },
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.gray,
              main: tokensDark.gray[500],
            },
            background: {
              default: tokensDark.primary[600],
              paper: tokensDark.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.gray[50],
              light: tokensDark.gray[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.gray,
              main: tokensDark.gray[500],
            },
            background: {
              default: tokensDark.gray[0],
            },
          }),
    },
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};
