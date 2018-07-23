import React from 'react'
import styled from 'styled-components'

const OverlayContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(56, 53, 53, 0.65);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Topbar = styled.div`
  height: 10%;
  width: 100%;
  background-color: rgba(31, 34, 38, 0.65);
  display: flex;
  justify-content: center;
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

export const Overlay = ({ children, style = {}, onCloseButtonPress }) => (
  <OverlayContainer className="overlay-container" style={style}>
    <Topbar>
      <div
        onClick={onCloseButtonPress}
        style={{ height: '20px', width: '20px', background: 'green' }}
      />
    </Topbar>
    <Content>{children}</Content>
  </OverlayContainer>
)
