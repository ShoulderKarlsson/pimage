import React from 'react'
import { compose, withState, lifecycle, withHandlers } from 'recompose'
import styled from 'styled-components'
import { Overlay } from './overlay.js'
import { Image } from './image-view.js'

const enhance = compose(
  withState('currentImage', 'setCurrentImage', ''),
  lifecycle({
    componentDidMount() {
      // Using this as a counter for our images
      let imageIndex = 0
      const images = this.props.images
      const amountOfImages = images.length
      this.props.setCurrentImage(this.props.images[imageIndex])
      this.interval = setInterval(() => {
        console.log('Changing image')
        // Simple rotation inside the array of images
        imageIndex = (imageIndex + 1) % amountOfImages
        this.props.setCurrentImage(images[imageIndex])
      }, 1000)
    },

    componentWillUnmount() {
      clearInterval(this.interval)
    },
  }),
)

const StatelessImageCirculation = ({ currentImage, onStop }) => {
  return (
    <Overlay onCloseButtonPress={() => onStop()}>
      <Image src={`http://localhost:5000${currentImage}`} height={'86%'} />
    </Overlay>
  )
}

export const ImageCirculation = enhance(StatelessImageCirculation)
