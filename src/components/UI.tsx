import * as React from "react";
import GameState from "GameState";
import PlanetView from "./PlanetView";

interface Props {
	gameState: GameState
}

export default class UI extends React.Component<Props> {
	public render() {
		const { activeScene } = this.props.gameState
		switch (activeScene.name) {
			case 'PlanetScene':
				return <PlanetView gameState={this.props.gameState} />
			default:
				return null
		}
	}
}