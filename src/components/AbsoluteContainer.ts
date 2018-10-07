import styled from "styled-components";

interface AbsoluteContainerProps {
	top?: number,
	bottom?: number,
	left?: number,
	right?: number
}

const AbsoluteContainer = styled.div`
	position: absolute;
	display: flex;
	${(props: AbsoluteContainerProps) => typeof props.top !== 'undefined' && `top: ${props.top}px;`}
	${(props: AbsoluteContainerProps) => typeof props.left !== 'undefined' && `left: ${props.left}px;`}
	${(props: AbsoluteContainerProps) => typeof props.right !== 'undefined' && `right: ${props.right}px;`}
	${(props: AbsoluteContainerProps) => typeof props.bottom !== 'undefined' && `bottom: ${props.bottom}px;`}
`

export default AbsoluteContainer