import * as React from "react";
import Tile, { Bonus } from "models/Tile";
import styled from "styled-components";

const TileContainer = styled.div`
	width: 50px;
	height: 50px;
	border: 2px solid black;
	margin: 5px;
	background: #a2a9b3;
	color: black;
	text-align: center;
	font-size: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
`

const bonusDisplay = (bonus: Bonus) => {
	switch (bonus) {
		case Bonus.Titanium:
			return 'Extra Titanium'
		case Bonus.Food:
			return 'Extra Food'
		case Bonus.Steel:
			return 'Extra Steel'
		case Bonus.None:
			return ''
	}
}

export default function TileComponent(tile: Tile) {
	return (
		<TileContainer>
			{bonusDisplay(tile.bonus)}
		</TileContainer>
	)
}