import React from 'react'
import fetch from 'isomorphic-fetch'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'
import { Overlay } from './overlay'

const Image = styled.img`
  height: ${props => (props.height ? props.height : '43%')};
  width: auto;
  margin: 3px;
`

const enhance = compose(
  withState('images', 'setImages', []),
  withState('activeImage', 'setActiveImage', ''),
  withHandlers({
    fetchImages: ({ location, setImages }) => () => {
      fetch(`http://localhost:5000${location.pathname}`)
        .then(res => (res.ok ? res.json() : Promise.reject(res)))
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
        // Must close the full-preview of the image if the route changes
        if (this.props.activeImage) {
          this.props.setActiveImage('')
        }
        this.props.fetchImages()
      }
    },
  }),
)

export const ImageView = enhance(({ images, activeImage, setActiveImage }) => {
  return (
    <div
      style={{
        height: '100vh',
        overflow: 'scroll',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {/* This is probably not optimal, but going with this for now since images are chaced. */}
      {activeImage ? (
        <Overlay onCloseButtonPress={() => setActiveImage('')}>
          <Image src={activeImage} height={'100%'} />
        </Overlay>
      ) : (
        images.map((imagePath, i) => {
          const fullPath = `http://localhost:5000${imagePath}`
          return (
            <Image
              onClick={() => setActiveImage(fullPath)}
              key={i}
              src={fullPath}
            />
          )
        })
      )}
    </div>
  )
})
