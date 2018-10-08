import * as React from "react";
import styled from "styled-components";
import GameState from "GameState";
import EventBus from "EventBus";

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

const PlayerName = styled.span`
	color: ${props => props.color};
	margin-right: 15px;
`

const setSpeed1 = () => EventBus.emit('SET_SPEED_1')
const setSpeed2 = () => EventBus.emit('SET_SPEED_2')
const setSpeed3 = () => EventBus.emit('SET_SPEED_3')

export default function StatusBar(props: Props) {
	return (
		<BarContainer>
			<div>
				<PlayerName color={props.gameState.company.color}>{props.gameState.company.name}</PlayerName>
				Credits: {props.gameState.company.credits}
			</div>
			<div>
				Day: {Math.floor(props.gameState.days)}
			</div>
			<div>
				<button onClick={setSpeed1}>></button>
				<button onClick={setSpeed2}>>></button>
				<button onClick={setSpeed3}>>>></button>
			</div>
		</BarContainer>
	)
}