import React from 'react'
import styled from 'styled-components'
import {Route} from 'react-router-dom'
import {Sidebar} from './components/sidebar.js'
import {MainContent} from './components/main-content.js'

const ApplicationContainer = styled.div`
  display: flex;
  flexDirection: row;
`


export const App = ({...props}) => {
  return (
    <ApplicationContainer>
      <Sidebar {...props} />
      <MainContent {...props} />
    </ApplicationContainer>
  )
}

export default App
