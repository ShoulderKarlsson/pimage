import React from 'react'
import { compose, withState, lifecycle } from 'recompose'
import { Image, CustomImage } from './image-view.js'

const enhance = compose(
  withState('currentImage', 'setCurrentImage', ''),
  lifecycle({
    componentDidMount() {
      let imageIndex = 0
      const images = this.props.images
      const amountOfImages = images.length
      this.props.setCurrentImage(this.props.images[imageIndex])
      this.interval = setInterval(() => {
        // "Looping" trough the images array
        imageIndex = (imageIndex + 1) % amountOfImages
        this.props.setCurrentImage(images[imageIndex])
      }, 1000)
    },

    componentWillUnmount() {
      clearInterval(this.interval)
    },
  }),
)

const StatelessImageCirculation = ({ currentImage }) => {
  return (
    <div className='image-cicrle-container' style={{background: 'orange', height: '100%', width: 'auto'}}>
      <CustomImage src={`http://localhost:5000${currentImage}`} />
    </div>
  )
}

export const ImageCirculation = enhance(StatelessImageCirculation)
