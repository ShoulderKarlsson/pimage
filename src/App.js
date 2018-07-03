import React from 'react'
import {Sidebar} from './components/sidebar.js'
import styled from 'styled-components'

const ApplicationContainer = styled.div`
  display: flex;
  flexDirection: row;
`
const styles = {
  mockContent: {
    height: '100vh',
    backgroundColor: 'orange',
    flex: 4
  }
}

export const App = ({...props}) => {
  return (
    <ApplicationContainer>
      <Sidebar flex={1} />
      <div style={styles.mockContent}>I am to be the content</div>
    </ApplicationContainer>
  )
}

export default App;
