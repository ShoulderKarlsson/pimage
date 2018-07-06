import React from 'react'
import {Route} from 'react-router-dom'
import styled from 'styled-components'
import {ImageView} from './image-view.js'

const MainContentContainer = styled.div`
  background-color: papayawhip;
  flex: 5
`

export const MainContent = () => {
  return (
      <MainContentContainer>
        <Route 
          exact 
          path='/'
          component={DefaultMainContent}
        />

        <Route path='/:folder' component={ImageView}/>
      </MainContentContainer>
  )
}

const DefaultMainContent = () => {
  return (
    <div 
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
    <p>To View a image, select a folder form the sidebar!</p>
    </div>
  )
}
