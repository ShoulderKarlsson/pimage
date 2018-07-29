import React from 'react'
import styled from 'styled-components'

const translateButtonPosition = position => {
  console.log('position', position)
  // Default position
  if (position === 'left') {
    return 'flex-start'
  } else if (position === 'right') {
    return 'flex-end'
  } else if (position === 'center') {
    return position
  } else {
    // Not sure what to return as default?
    return 'initial'
  }
}

const OverlayContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(56, 53, 53, 0.65);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Content = styled.div`
  height: 80%;
  width: 80%;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Overlay = ({
  children,
  style = {},
  onButtonPress,
  buttonPosition,
}) => (
  <OverlayContainer className="overlay-container" style={style}>
    <Bar buttonPosition={buttonPosition} onButtonPress={onButtonPress} />
    <Content>{children}</Content>
  </OverlayContainer>
)

export const Bar = ({ buttonPosition, onButtonPress }) => {
  return (
    <div
      style={{
        height: '10%',
        width: '100%',
        backgroundColor: 'rgba(31, 34, 38, 0.65)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: translateButtonPosition(buttonPosition),
      }}
    >
      <div
        onClick={onButtonPress}
        style={{
          height: '20px',
          width: '20px',
          background: 'green',
          marginLeft: '12px',
          marginRight: '12px',
        }}
      />
    </div>
  )
}
