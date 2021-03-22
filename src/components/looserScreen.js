import React, { useContext } from "react";
import { PlayerContext } from "../context";
import useStyles from "./styles";
import {
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemIcon
} from "@material-ui/core";

const LooserScreen = () => {
	const classes = useStyles();
	const context = useContext(PlayerContext);

	console.log("context from screen 2", context);
	return (
		<>
			<div className={classes.paper}>
				<h3>The looser is:</h3>
				<div>{context.state.result}</div>
				<div>
					<Button
						id='start-btn'
						variant='contained'
						color='secondary'
						type='submit'
						className={classes.next}
						onClick={() => context.resetGame()}>
						START OVER
					</Button>
				</div>
				<div>
					<Button
						id='looser-btn'
						variant='contained'
						color='inherit'
						type='submit'
						className={classes.submit}
						onClick={() => context.getLooser()}>
						GET NEW LOOSER
					</Button>
				</div>
			</div>
		</>
	);
};

export default LooserScreen;
