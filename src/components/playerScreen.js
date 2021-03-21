import React, { useState, useContext, useRef } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { PlayerContext } from "../context";
import useStyles from "./styles";
import {
	TextField,
	Checkbox,
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Grid,
	Box,
	FormControlLabel,
	Link,
	ListItemIcon
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as Yup from "yup";

const Screen1 = () => {
	const classes = useStyles();
	const textInputRef = useRef();
	const context = useContext(PlayerContext);

	console.log("context screen 1", context);

	const charOnlyRegex = /^[a-zA-Z]+$/;

	const inputValidationField = Yup.object().shape({
		playerName: Yup.string().test(
			"text-length",
			"Player name must be at least 3 characters, numbers are not allowed!",
			(validateString) => {
				if (!validateString) {
					return false;
				}
				if (!charOnlyRegex.test(validateString)) {
					return false;
				}
				if (validateString.length >= 3) {
					return true;
				}
			}
		)
	});

	return (
		<div className={classes.paper}>
			<Formik
				innerRef={textInputRef}
				initialValues={{ playerName: "" }}
				onSubmit={(values) => {
					context.addPlayer(values.playerName);
					console.log("values formik", values);
					console.log("ref", textInputRef.current.values);
				}}
				validationSchema={inputValidationField}>
				{(props) => (
					<>
						<Form className={classes.form}>
							<div className='form-control'>
								<TextField
									id='playerName'
									name='playerName'
									variant='outlined'
									margin='normal'
									fullWidth
									placeholder='add a player name'
									value={props.values.playerName}
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									ref={textInputRef.playerName}
								/>
								<ErrorMessage name='playerName'>
									{(msg) => <span className='error'>{msg}</span>}
								</ErrorMessage>
								{console.log("props formik", props)}
							</div>
							<Button
								className={classes.submit}
								type='submit'
								fullWidth
								disabled={!props.isValid || !props.dirty}
								variant='contained'
								color='secondary'>
								Add player
							</Button>
						</Form>
						{context.state.players.length > 0 ? (
							<>
								<hr />
								<List className={classes.root}>
									{context.state.players.map((item, idx) => (
										<li key={idx} className={classes.listSection}>
											<ul className={classes.ul}>
												<ListItem
													key={item._id}
													button
													onClick={() => context.deletePlayer(item._id, idx)}>
													<ListItemIcon>
														<DeleteForeverIcon />
													</ListItemIcon>
													<ListItemText primary={`player name: ${item.name}`} />
												</ListItem>
											</ul>
										</li>
									))}
								</List>
								<div>
									<Button
										className={classes.next}
										type='submit'
										size='large'
										variant='contained'
										color='primary'>
										NEXT
									</Button>
								</div>
							</>
						) : null}
					</>
				)}
			</Formik>
		</div>
	);
};

export default Screen1;
