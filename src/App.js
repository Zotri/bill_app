import React, { useContext } from "react";
import "./App.css";
import PlayerScreen from "./components/playerScreen";
import LooserScreen from "./components/looserScreen";
import { PlayerContext } from "./context";
import { Container, Typography, CssBaseline } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	const context = useContext(PlayerContext);
	console.log("context", context);
	console.log("context.state", context.state);

	return (
		<div className='App'>
			<Container component='main' fixed>
				<CssBaseline />
				<Typography component='h1' variant='h3'>
					Who pays the Bill ?
				</Typography>
				{context.state.screens === 1 ? <PlayerScreen /> : <LooserScreen />}
			</Container>
		</div>
	);
};

export default App;
