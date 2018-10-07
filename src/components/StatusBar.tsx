import * as React from "react";
import styled from "styled-components";
import GameState from "GameState";

const BarContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	padding: 0 20px;
	box-sizing: border-box;
	height: 30px;
	background: #003151;
	color: white;
	font-size: 12px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

interface Props {
	gameState: GameState
}

export default function StatusBar(props: Props) {
	return (
		<BarContainer>
			Credits: {props.gameState.company.credits}
		</BarContainer>
	)
}