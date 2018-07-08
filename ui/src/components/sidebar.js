import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { compose, withState, lifecycle } from 'recompose'
import fetch from 'isomorphic-fetch'
import { SidebarLink } from './sidebar-link.js'
import { Loading } from './loading.js'

const SidebarContainer = styled.div`
  flex: ${props => (props.flex ? props.flex : 1)};
  height: 100vh;
  flex-direction: column;
  background-color: yellow;
`

const SidebarContentContainer = styled.div``

// const enhance = compose(
//   withRouter,
//   withState('folders', 'setFolderLinks', []),
//   // withFetch(() => fetch('http://localhost:5000/images')),
//   branch(
//     props => {
//       const test = !!props.folders.length
//       console.log(`Test = ${test}`)
//       return test
//     },
//     WrappedComponent => props => <WrappedComponent {...props} />,
//     withFetch(() => fetch('http://localhost:5000/images')),
//   ),
//   lifecycle({
//     componentDidMount() {
//       console.log('Mounting!')
//     },
//   }),
// )
//

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
)

export const Sidebar = enhance(({ folderData, ...props }) => {
  return (
    <SidebarContainer>
      {!folderData.length ? (
        <Loading />
      ) : (
        <Folders data={folderData} activePath={props.location.pathname} />
      )}
    </SidebarContainer>
  )
})

const Folders = ({ data, activePath }) => {
  return (
    <React.Fragment>
      {data.map(({ path, name }, i) => (
        <SidebarLink
          isActive={activePath === path}
          path={path}
          name={name}
          key={i}
        />
      ))}
    </React.Fragment>
  )
}
