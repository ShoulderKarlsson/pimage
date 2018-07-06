import React from 'react'
import {MdFolder, MdFolderOpen} from 'react-icons/lib/md'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'


const SidebarLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: orange;
  margin: 10px;
  height: 100px;
  width: 100px;
`

export const SidebarLink = withRouter(({name, path, isActive, history, ...props}) => {
  return (
    <SidebarLinkContainer onClick={() => history.push(path)}>
      <div className='folder-container'>
        {isActive ? <MdFolderOpen /> : <MdFolder />}
      </div>
      <div className='name-container'>
        <p>{name}</p>
      </div>
    </SidebarLinkContainer>
  )
})
