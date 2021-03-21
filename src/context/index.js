import React, { Component } from "react";

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

	render() {
		return (
			<PlayerContext.Provider
				value={{
					state: this.state,
					addPlayer: this.addPlayerHandler,
					updateError: this.updateErrorField,
					deletePlayer: this.removePlayerHandler
				}}>
				{this.props.children}
			</PlayerContext.Provider>
		);
	}
}

export { PlayerContextProvider, PlayerContext };
