import React from 'react'
import styled from 'styled-components'
import { Sidebar } from './components/sidebar.js'
import { MainContent } from './components/main-content.js'

const ApplicationContainer = styled.div`
  display: flex;
  flexdirection: row;
`

export const App = () => {
  return (
    <ApplicationContainer>
      <Sidebar />
      <MainContent />
    </ApplicationContainer>
  )
}

export default App
