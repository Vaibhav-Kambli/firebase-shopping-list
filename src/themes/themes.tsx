import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
	typography: {
		fontFamily: ["Montserrat", "sans-serif"].join(","),
		fontSize: 12,

		body1: {
			color: "#000",
			fontWeight: "bold",
			fontSize: "14px",
			lineHeight: "1.6",
		},
		body2: {
			fontWeight: "bold",
			marginBottom: "10px",
			fontSize: "25px",
			lineHeight: "1.6",
		},
	},
	palette: {
		primary: { main: "#161a1d" },
		secondary: { main: "#FF510C" },
	},
});
