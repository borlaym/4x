import * as React from "react";
import GameState from "GameState";
import PlanetView from "./PlanetView";
import StatusBar from "./StatusBar";

interface Props {
	gameState: GameState
}

function SceneView(props: Props) {
	const { activeScene } = props.gameState
	switch (activeScene.name) {
		case 'PlanetScene':
			return <PlanetView gameState={props.gameState} />
		default:
			return null
	}
}

export default class UI extends React.Component<Props> {
	public render() {
		return (
			<React.Fragment>
				<StatusBar {...this.props} />
				<SceneView {...this.props} />
			</React.Fragment>
		)
	}
}