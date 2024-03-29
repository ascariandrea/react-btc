import { darken, lighten } from "@mui/material";
import { createTheme, useTheme, type ThemeOptions } from "@mui/material/styles";
import { createStyled } from "@mui/system";

const primary = "#FF5E5B";
const primaryLight = lighten(primary, 0.5);
const primaryDark = darken(primary, 0.5);

export const secondary = "#17B9B6";
export const secondaryLight = lighten(secondary, 0.5);
export const secondaryDark = darken(secondary, 0.5);

const themeOptions: ThemeOptions = {
  palette: {
    common: {
      white: "#EEE",
      black: "#111",
    },
    primary: {
      main: primary,
      light: primaryLight,
      dark: primaryDark,
      contrastText: "#fff",
    },
    secondary: {
      main: secondary,
      light: secondaryLight,
      dark: secondaryDark,
      contrastText: "#FFF",
    },
  },
  typography: () => ({
    fontWeightRegular: 400,
    fontWeightBold: 600,
    h1: {
      //   fontFamily: secondaryFontFamily,
      marginBottom: 40,
      fontWeight: 600,
    },
    h2: {
      //   fontFamily: secondaryFontFamily,
      marginBottom: 30,
      fontWeight: 600,
    },
    h3: {
      //   fontFamily: secondaryFontFamily,
      marginBottom: 20,
      fontWeight: 600,
    },
    h4: {
      //   fontFamily: secondaryFontFamily,
      marginBottom: 20,
      fontWeight: 600,
    },
    h5: {
      //   fontFamily: secondaryFontFamily,
      marginBottom: 20,
      fontWeight: 600,
    },
    h6: {
      //   fontFamily: secondaryFontFamily,
      marginBottom: 20,
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 600,
      color: primaryLight,
    },
    subtitle2: {
      fontWeight: 600,
      color: secondaryDark,
    },
    body1: {
      //   fontFamily: secondaryFontFamily,
      fontWeight: 400,
    },
    body2: {
      //   fontFamily: primaryFontFamily,
      fontWeight: 300,
    },
  }),
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        WebkitFontSmoothing: "auto",
        // html: "100%",
        // fontFamily: primaryFontFamily,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          //   color: "red",
          backgroundColor: secondary,
        },
      },
      defaultProps: {
        color: "primary",
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
  },
};

const AppTheme = createTheme(themeOptions as any);

// type AppTheme = typeof AppTheme;

const styled = createStyled({ defaultTheme: AppTheme });

export { AppTheme, useTheme, styled, themeOptions, type ThemeOptions };
