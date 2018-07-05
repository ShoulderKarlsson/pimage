import React from 'react'
import {Sidebar} from './components/sidebar.js'
import styled from 'styled-components'
import {Route} from 'react-router-dom'

const ApplicationContainer = styled.div`
  display: flex;
  flexDirection: row;
`

const MainContentContainer = styled.div`
  background-color: papayawhip;
  flex: 5
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
      <Sidebar {...props} />
      <MainContentContainer>
        <Route exact path='/' render={() => <div>main</div>}/>
        <Route path='/:folder' render={() => <div>foo</div>}/>
      </MainContentContainer>
    </ApplicationContainer>
  )
}

export default App
