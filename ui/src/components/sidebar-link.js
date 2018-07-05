import React from 'react'
import {MdFolder, MdFolderOpen} from 'react-icons/lib/md'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

export const SidebarLink = ({...props}) => {
  console.log(props)
  return (
    <div>
      <Link to={props.name}>
        <p>Hej</p>
      </Link>
    </div>
  )
}
