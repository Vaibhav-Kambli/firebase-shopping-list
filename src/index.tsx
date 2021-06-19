import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FirebaseAppProvider } from "reactfire";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/themes";

const firebaseConfig = {
	apiKey: "AIzaSyCPCJHsNeUWb6sXXSZA5agX6cuhWqN2KzM",
	authDomain: "shopping-list-firebase-app.firebaseapp.com",
	projectId: "shopping-list-firebase-app",
	storageBucket: "shopping-list-firebase-app.appspot.com",
	messagingSenderId: "676696879633",
	appId: "1:676696879633:web:c52ec5a86919a49823f7b0",
};

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={theme}>
			<FirebaseAppProvider firebaseConfig={firebaseConfig}>
				<App />
			</FirebaseAppProvider>
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
