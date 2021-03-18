import React, { useContext } from "react";
import "./App.css";
import Screen1 from "./components/screen1";
import Screen2 from "./components/screen2";
import { PlayerContext, PlayerContextProvider } from "./context";
import { Container, Typography, CssBaseline } from "@material-ui/core";

const App = () => {
	const context = useContext(PlayerContext);
	console.log(context);

	return (
		<PlayerContextProvider>
			<Container component='main' fixed>
				<CssBaseline />
				<Typography component='h1' variant='h3'>
					Who pays the Bill ?
				</Typography>
				{context.screens === 1 ? <Screen1 /> : <Screen2 />}
			</Container>
		</PlayerContextProvider>
	);
};

export default App;
