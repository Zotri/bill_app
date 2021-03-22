import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlayerContext = React.createContext();

class PlayerContextProvider extends Component {
	state = {
		screens: 1,
		players: [],
		result: "",
		error: ""
	};

	isPlayerAdded = (playerName) => {
		// when playerName matched one in the players array returns false
		return !this.state.players.some((el) => el.name === playerName);
	};

	playerNameIdGenerator = () => {
		return "_" + Math.random().toString(14).substr(2, 9);
	};

	addPlayerHandler = (name) => {
		const isAdded = this.isPlayerAdded(name);
		const _id = this.playerNameIdGenerator();
		if (isAdded && name) {
			this.setState((prevState) => ({
				players: [
					...prevState.players,
					{
						_id: _id,
						name: name
					}
				]
			}));
		} else this.errorHandler("player is already defined");
	};

	errorHandler = (errorMsg) => {
		this.setState({
			error: errorMsg
		});
	};

	updateErrorField = () => {
		this.setState({
			error: ""
		});
	};

	removePlayerHandler = (_id, idx) => {
		if (this.state.players.some((el) => el._id === _id)) {
			let clonePlayerArray = this.state.players;

			clonePlayerArray.splice(idx, 1);
			// you must apply this method on the same declared varaible to retain the array after deleting at index _id
			// if you declared a new varaible e.g., let res =  clonePlayerArray.splice(idx, 1); it will return only the deleted el

			// let myFish = ["angel", "clown", "drum", "sturgeon"];
			// let removed = myFish.splice(2, 1, "trumpet");

			// myFish is ["angel", "clown", "trumpet", "sturgeon"]
			// removed is ["drum"]

			console.log("clonePlayerArray  after splice", clonePlayerArray);

			this.setState({
				players: clonePlayerArray
			});

			console.log("state", this.state.players);
		}
		return;
	};

	generateLooser = () => {
		const { players } = this.state;
		let result = players[Math.floor(Math.random() * players.length)];
		console.log("result", result);
		this.setState({
			result: result.name
		});
	};

	nextHandler = () => {
		// check if the user has the min amount of players, then allows screens to get the value 2,
		// if not then show the taost (toastify- react lib)
		const { players } = this.state;
		if (players.length < 2) {
			toast.error("You need to add one more player !", {
				position: toast.POSITION.TOP_LEFT,
				autoClose: 3000
			});
		} else {
			this.setState(
				{
					screens: 2
				},
				() => {
					setTimeout(() => {
						this.generateLooser();
					}, 1500);
				}
			);
		}
	};

	resetGameHandler = () => {
		this.setState({
			screens: 1,
			players: [],
			result: "",
			error: ""
		});
	};

	render() {
		return (
			<>
				<PlayerContext.Provider
					value={{
						state: this.state,
						addPlayer: this.addPlayerHandler,
						updateError: this.updateErrorField,
						deletePlayer: this.removePlayerHandler,
						getLooser: this.generateLooser,
						next: this.nextHandler,
						resetGame: this.resetGameHandler
					}}>
					{this.props.children}
				</PlayerContext.Provider>
				<ToastContainer />
			</>
		);
	}
}

export { PlayerContextProvider, PlayerContext };
