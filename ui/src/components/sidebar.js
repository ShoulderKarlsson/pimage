import React from 'react'
import styled from 'styled-components'
import {compose} from 'recompose'
import {withFetch} from 'with-fetch'
import fetch from 'isomorphic-fetch'
import {SidebarLink} from './sidebar-link.js'
import {Loading} from './loading.js'

const SidebarContainer = styled.div`
  flex: ${props => props.flex ? props.flex : 1};
  height: 100vh;
  flex-direction: column;
  background-color: yellow;
`

const enhance = compose(
  withFetch(() => fetch('http://localhost:5000/images'))
)

export const Sidebar = enhance(({data, loading, ...props}) => {
  console.log('rendering sidebar')
  return (
    <SidebarContainer>
      {
        loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            {data.body.map(({path, name}, i) => (
                <SidebarLink 
                  isActive={props.location.pathname === path}
                  path={path}
                  name={name}
                  key={i}
                />
              )
            )}
          </React.Fragment>
        )
      }
    </SidebarContainer>
  )
})
