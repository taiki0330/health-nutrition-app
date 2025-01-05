import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import { blue, green, grey, orange, purple, red } from "@mui/material/colors";

// MUIのオリジナルの色の型を作成する
declare module "@mui/material/styles" {
  interface Palette {
    energyColor: PaletteColor;
    proteinColor: PaletteColor;
    fatColor: PaletteColor;
    carboColor: PaletteColor;
    saltColor: PaletteColor;
    calciumColor: PaletteColor;
  }

  // 初期設定
  interface PaletteOptions {
    energyColor?: PaletteColorOptions;
    proteinColor?: PaletteColorOptions;
    fatColor?: PaletteColorOptions;
    carboColor?: PaletteColorOptions;
    saltColor?: PaletteColorOptions;
    calciumColor?: PaletteColorOptions;
  }
}

// プロジェクト全体で適用するテーマをMUIで作成する
export const theme = createTheme({
  // 文字について統一
  typography: {
    fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  // それぞれの色について統一
  palette: {
    energyColor: {
      main: blue[500],
      light: blue[100],
      dark: blue[700],
    },
    proteinColor: {
      main: red[500],
      light: red[100],
      dark: red[700],
    },
    fatColor: {
      main: green[500],
      light: green[100],
      dark: green[700],
    },
    carboColor: {
      main: grey[500],
      light: grey[100],
      dark: grey[700],
    },
    saltColor: {
      main: purple[500],
      light: purple[100],
      dark: purple[700],
    },
    calciumColor: {
      main: orange[500],
      light: orange[100],
      dark: orange[700],
    },
  }
})

