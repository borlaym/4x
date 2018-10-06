import * as React from "react";
import GameState from "GameState";
import styled from 'styled-components'
import PlanetScene from "PlanetScene";

interface Props {
	gameState: GameState
}

interface AbsoluteContainerProps {
	top?: number,
	bottom?: number,
	left?: number,
	right?: number
}

const AbsoluteContainer = styled.div`
	position: absolute;
	display: flex;
	${(props: AbsoluteContainerProps) => props.top && `top: ${props.top}px;`}
	${(props: AbsoluteContainerProps) => props.left && `left: ${props.left}px;`}
	${(props: AbsoluteContainerProps) => props.right && `right: ${props.right}px;`}
	${(props: AbsoluteContainerProps) => props.bottom && `bottom: ${props.bottom}px;`}
`

const Panel = styled.div`
	width: 500px;
	border: 2px solid #003151;
	background: rgba(55, 55, 72, 0.3);
	color: white;
	font-family: sans-serif;
`

export default class PlanetView extends React.Component<Props> {
	public render() {
		const scene = this.props.gameState.activeScene
		if (!(scene instanceof PlanetScene)) {
			return null
		}
		const planet = scene.planet
		return (
			<AbsoluteContainer top={20} right={20}>
				<Panel>
					{planet.name}
				</Panel>
			</AbsoluteContainer>
		)
	}
}