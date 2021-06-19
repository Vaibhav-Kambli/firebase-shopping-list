import React, { useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			margin: "10px",
		},
		inputRoot: {
			color: "red",
		},

		formData: {
			display: "flex",
			justifyContent: "space-between",
			margin: theme.spacing(3),
		},
		textField: {
			width: "100%",
		},
		btn: {
			margin: "30px",
		},
	})
);

// props
type Props = {
	addItem: Function;
};

export const AddItems = ({ addItem }: Props) => {
	const classes = useStyles();

	const [input, setInput] = useState("");

	const handleClick = () => {
		addItem(input);
		setInput("");
	};

	return (
		<div className={classes.root}>
			<FormControl className={clsx(classes.formData, classes.textField)}>
				<InputLabel htmlFor="input-old-password">Add Item</InputLabel>
				<Input
					type="text"
					value={input}
					placeholder="Eg Milk"
					onChange={(e) => setInput(e.target.value)}
				/>
			</FormControl>

			<Button
				className={classes.btn}
				variant="contained"
				color="primary"
				onClick={() => handleClick()}
			>
				Add to list
			</Button>
		</div>
	);
};

export default AddItems;
