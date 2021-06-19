import React, { useEffect, useState } from "react";
import "firebase/firestore";
import { useFirestoreDocData, useFirestore } from "reactfire";
import DeleteIcon from "@material-ui/icons/Delete";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
	List,
	ListItem,
	ListItemText,
	Typography,
	Checkbox,
	IconButton,
} from "@material-ui/core";
export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		btn: {
			margin: "30px",
		},
		list: {
			display: "flex",
			flexDirection: "column",
			width: "80%",
			justifyContent: "space-between",
			textAlign: "center",
			margin: "0 auto",
			paddin: "10px",
			[theme.breakpoints.down("sm")]: {
				width: "100%",
			},
			[theme.breakpoints.up("md")]: {
				width: "80%",
			},
		},
		items: {
			background: "#f5f3f4",
			padding: "10px",
			borderBottom: "1px solid gray",
		},
	})
);

const ListItems = () => {
	const classes = useStyles();
	const firestore = useFirestore();
	const itemsRef = useFirestore().collection("shoppinglist").doc("items");
	const collection = firestore.collection("shoppinglist");
	const doc = collection.doc("items");

	const { status, data: shoppinglist }: any = useFirestoreDocData(itemsRef);

	const [itemsList, setItemsList]: any = useState([]);
	const [dense] = useState(false);
	const [secondary] = useState(false);

	useEffect(() => {
		if (status !== "loading") {
			setItemsList(shoppinglist.items);
		}
	}, [shoppinglist, status, itemsList]);

	// function to delete item from firestore
	const deleteItem = (id: string) => {
		const newArray: Array<any> = shoppinglist.items.filter(
			(item: { id: string }) => item.id !== id
		);

		try {
			doc.set({ items: newArray });
		} catch (err) {
			console.log(err);
		}
	};

	// function to update check value in firestore
	const handleChange = (item: {
		id: string;
		text: string;
		checked: boolean;
	}) => {
		let index = itemsList.indexOf(item);

		itemsList[index].checked = !itemsList[index].checked;

		try {
			doc.update({ items: itemsList });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			{status === "loading" ? (
				<Typography variant="body2">Items loading please wait...</Typography>
			) : itemsList === undefined ? (
				<Typography variant="body2">Add something to the list...</Typography>
			) : itemsList.length === 0 ? (
				<Typography variant="body2">Shopping list is empty</Typography>
			) : (
				<div className={classes.list}>
					<Typography variant="body2">Items in the list:</Typography>
					<List dense={dense}>
						{itemsList.map(
							(item: { id: string; text: string; checked: boolean }) => (
								<ListItem key={item.id} className={classes.items}>
									<Checkbox
										edge="start"
										checked={item.checked}
										tabIndex={-1}
										onChange={() => handleChange(item)}
										disableRipple
										color="primary"
									/>
									<ListItemText
										primary={item.text}
										secondary={secondary ? "Secondary text" : null}
									/>

									<IconButton
										edge="end"
										aria-label="delete"
										onClick={() => deleteItem(item.id)}
									>
										<DeleteIcon />
									</IconButton>
								</ListItem>
							)
						)}
					</List>
				</div>
			)}
		</div>
	);
};

export default ListItems;
