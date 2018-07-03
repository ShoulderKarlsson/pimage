import React from 'react'
import styled from 'styled-components'

const SidebarContainer = styled.div`
  flex: ${props => props.flex ? props.flex : 1};
  height: 100vh;
`

export const Sidebar = ({...props}) => {
  return (
    <SidebarContainer {...props}>
      <p>Sidebar</p>
    </SidebarContainer>
  )
}
