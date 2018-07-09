import React from 'react'
import fetch from 'isomorphic-fetch'
import styled from 'styled-components'
import Masonry from 'react-masonry-component'
import { compose, lifecycle, withState, withHandlers } from 'recompose'

const ImageViewContainer = styled.div`
  display: flex;
`

const Image = styled.img`
  width: 40%;
  height: auto;
`

const enhance = compose(
  withState('images', 'setImages', []),
  withHandlers({
    fetchImages: ({ location, setImages }) => () => {
      fetch(`http://localhost:5000${location.pathname}`)
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json())
        .then(({ body }) => setImages(body))
        .catch(error => {
          console.log(error)
        })
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchImages()
    },

    componentDidUpdate(prevProps) {
      if (prevProps.location.pathname !== this.props.location.pathname) {
        this.props.fetchImages()
      }
    },
  }),
)

export const ImageView = enhance(({ images }) => {
  return (
    <Masonry>
      {images.map((path, i) => (
        <Image key={i} src={`http://localhost:5000${path}`} />
      ))}
    </Masonry>
  )
})
