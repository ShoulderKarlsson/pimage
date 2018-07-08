import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { compose, withState, lifecycle, mapProps } from 'recompose'
import fetch from 'isomorphic-fetch'
import { SidebarLink } from './sidebar-link.js'
import { Loading } from './loading.js'

const SidebarContainer = styled.div`
  flex: ${props => (props.flex ? props.flex : 1)};
  height: 100vh;
  flex-direction: column;
  background: #0e1219;
`

const enhance = compose(
  withRouter,
  withState('folderData', 'setFolderData', []),
  lifecycle({
    componentDidMount() {
      fetch('http://localhost:5000/images')
        .then(res => (res.ok ? res.json() : Promise.reject(res)))
        .then(data => this.props.setFolderData(data.body))
        .catch(error => console.log(error))
    },
  }),
  mapProps(({ location, ...props }) => ({
    currentPath: location.pathname,
    ...props,
  })),
)

export const Sidebar = enhance(({ folderData, currentPath, ...props }) => {
  return (
    <SidebarContainer>
      {!folderData.length ? (
        <Loading />
      ) : (
        <Folders data={folderData} activePath={currentPath} />
      )}
    </SidebarContainer>
  )
})

const Folders = ({ data, activePath }) => {
  const amountOfImages = data.length
  return (
    <React.Fragment>
      {data.map(({ path, name }, i) => (
        <SidebarLink
          amountOfImages={amountOfImages}
          isActive={activePath === path}
          path={path}
          name={name}
          key={i}
        />
      ))}
    </React.Fragment>
  )
}
