import React from 'react'
import {compose, mapProps, shouldUpdate} from 'recompose'
import {withFetch} from 'with-fetch'
import fetch from 'isomorphic-fetch'
import styled from 'styled-components'


const ImageViewContainer = styled.div`
  
`

export class ImageView extends React.Component {
  state = {
    images: []
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.fetchImages()
  }

  fetchImages() {
    fetch(`http://localhost:5000${this.props.location.pathname}`)
    .then(res => res.ok ? res : Promise.reject(res))
    .then(res => res.json())
    .then(({body}) => this.setState(() => ({images: body})))
    .catch(error => {
      console.log(error)
    })
  }

  componentDidUpdate(prevProps, prevState) {

    // new path means new folder, therefore fetch new images
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.fetchImages()
    }
  }

  render() {
    return (
      <ImageViewContainer>
        {this.state.images.map((path, i) => {
          return (
            <Image uri={`http://localhost:5000${path}`} />
          )
        })}
      </ImageViewContainer>
    )
  }
}


// ========================================================

const Image = styled.div`
  height: 100px;
  width: 100px;
  background: url(${props => props.uri}) no-repeat;
  background-size: cover;
`
