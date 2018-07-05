import React from 'react'
import styled from 'styled-components'
import {compose} from 'recompose'
import {withFetch} from 'with-fetch'
import fetch from 'isomorphic-fetch'
import {SidebarLink} from './sidebar-link.js'

const SidebarContainer = styled.div`
  flex: ${props => props.flex ? props.flex : 1};
  height: 100vh;
  flex-direction: column;
`

const enhance = compose(
  withFetch(() => fetch('http://localhost:5000/images')),
)

export const Sidebar = enhance(({data, loading, ...props}) => {
  return (
    <SidebarContainer>
    {loading ? <p>Waiting..</p> : (
      data.body.map(({path, name}, i) => <SidebarLink key={i} name={name} path={path} {...props} />)
    )}
    </SidebarContainer>
  )
})
