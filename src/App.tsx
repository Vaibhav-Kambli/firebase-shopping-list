import { useEffect, useState } from "react";
import "firebase/firestore";
import { useFirestoreDocData, useFirestore } from "reactfire";
import { AppBar, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AddItems from "./components/AddItems";
import ListItems from "./components/ListItems";
import { v4 as uuid } from "uuid";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexDirection: "column",
			width: "60%",
			height: "95vh",
			margin: "0 auto",

			textAlign: "center",
			overflow: "hidden",
			scrollY: "none",
			justifyContent: "flex-start",
		},

		btn: {
			margin: "30px",
		},
		grow: {
			flexGrow: 1,
		},
		nav: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			textAlign: "center",
			padding: "15px",
			marginBottom: "20px",
			color: "white",
		},
	})
);

function App() {
	const classes = useStyles();
	const firestore = useFirestore();
	const newCollection = firestore.collection("shoppinglist");
	const doc = newCollection.doc("items");
	const itemsRef = useFirestore().collection("shoppinglist").doc("items");

	const { status, data: shoppingLists }: any = useFirestoreDocData(itemsRef);

	const [listItems, setListItems]: any = useState([]);

	useEffect(() => {
		if (status !== "loading") {
			setListItems(shoppingLists.items);
		}
	}, [listItems, shoppingLists, status]);

	// function to add item to firestore database
	const addItem = (text: string) => {
		if (!text) {
			alert("Please add an item");
		} else {
			const next_arr = [
				...listItems,
				{ id: uuid(), text: text, checked: false },
			];

			setListItems(next_arr);
			try {
				doc.set({ items: next_arr });
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<>
			<AppBar className={classes.nav} position="static">
				<Typography style={{ color: "white", fontSize: "25px" }}>
					Grocery Shopping List
				</Typography>
			</AppBar>
			<div className={classes.root}>
				<AddItems addItem={addItem} />

				<div>
					<ListItems />
				</div>
			</div>
		</>
	);
}

export default App;
