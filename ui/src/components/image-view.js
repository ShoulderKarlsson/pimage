import React from 'react'
import fetch from 'isomorphic-fetch'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'
import { Overlay, Bar } from './overlay'
import { ImageCirculation } from './image-circulation.js'

export const Image = styled.img`
  height: ${props => (props.height ? props.height : '36%')};
  width: auto;
  margin: 3px;
`

const ImageContainer = styled.div`
  height: 100vh;
  overflow: scroll;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`

const enhance = compose(
  withState('images', 'setImages', []),
  withState('activeImage', 'setActiveImage', ''),
  withState('displayCirculation', 'setDisplayCirculation', false),
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
        // Closing preview if route changes
        if (this.props.activeImage) this.props.setActiveImage('')

        // If switch from one route to another
        // stop image circulation
        if (this.props.display) this.props.setDisplayCirculation(false)

        this.props.fetchImages()
      }
    },
  }),
)

export const ImageView = enhance(
  ({
    images,
    activeImage,
    setActiveImage,
    displayCirculation,
    setDisplayCirculation,
  }) => (
    <ImageContainer>
      {!activeImage &&
        (!displayCirculation && (
          <Bar
            buttonPosition="left"
            onButtonPress={() => setDisplayCirculation(true)}
          />
        ))}
      {images.length &&
        displayCirculation && (
          <ImageCirculation
            images={images}
            onStop={() => setDisplayCirculation(false)}
          />
        )}
      {activeImage ? (
        <Overlay
          topbarButtonPosition={'right'}
          onButtonPress={() => setActiveImage('')}
        >
          <Image src={activeImage} height={'86%'} />
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
    </ImageContainer>
  ),
)
