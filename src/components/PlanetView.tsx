import * as React from "react";
import GameState from "GameState";
import styled from 'styled-components'
import PlanetScene from "PlanetScene";
import TileComponent from "./Tile";
import AbsoluteContainer from "./AbsoluteContainer";

interface Props {
	gameState: GameState
}

const Panel = styled.div`
	width: 500px;
	border: 2px solid #003151;
	background: rgba(0, 21, 35, 0.8);
	color: white;
	font-family: sans-serif;
`

const PlanetName = styled.h1`
	font-size: 24px;
	text-align: center;
`

const Map = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`

const TileRow = styled.div`
	display: block;
`

export default class PlanetView extends React.Component<Props> {
	public render() {
		const scene = this.props.gameState.activeScene
		if (!(scene instanceof PlanetScene)) {
			return null
		}
		const planet = scene.planet
		console.log(planet)
		return (
			<AbsoluteContainer top={50} right={20}>
				<Panel>
					<PlanetName>{planet.name}</PlanetName>
					<Map>
						{planet.tiles.map(row => (
							<TileRow>
								{row.map(tile => (
									<TileComponent {...tile} />
								))}
							</TileRow>
						))}
					</Map>
				</Panel>
			</AbsoluteContainer>
		)
	}
}