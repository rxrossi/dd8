import { css } from "reakit"
import defaultTheme from "reakit-theme-default"

const palette = {
  primary: ["#fc157d", "#fd4799", "#fd58a2", "#fd7ab5", "#febdda", "#ffeff6"],
  primaryActive: "#ba0255"
}

const theme = {
  ...defaultTheme,

  palette: {
    ...defaultTheme.palette,
    ...palette
  },
  sizing: {
    topbar: "22px"
  },
  Table: css`
    width: 100%;
    margin: auto;
    border-collapse: collapse;

    & th {
      border-bottom: 1px solid ${defaultTheme.palette.grayscale[5]};
      padding: 16px 8px;
    }

    tr {
      border: 1px solid ${defaultTheme.palette.grayscale[6]};
    }

    tr:nth-child(even) {
      background-color: ${defaultTheme.palette.grayscale[6]};
    }

    & td {
      padding: 12px;
      border-radius: 2px;
    }
  `,
  Input: css`
    ${defaultTheme.Input};
    border: 1px solid ${defaultTheme.palette.background[2]};
  `,
  Image: css`
    ${defaultTheme.Image};
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  `
}

// console.log(theme)

export default theme
