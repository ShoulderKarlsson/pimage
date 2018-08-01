import React from 'react'
import fetch from 'isomorphic-fetch'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'
import { Overlay } from './overlay'
import { ImageCirculation } from './image-circulation'
import { PlayButtonWithLeftMargin, Bar } from './common'

// export const Image = styled.img`
//   height: ${props => (props.height ? props.height : '36%')};
//   width: auto;
//   margin: 3px;
// `

const ImageContainer = styled.div`
  height: 100vh;
  overflow: scroll;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`

const Section = styled.div`
  flex: ${props => props.flex};
`

const TopSection = styled(Section)`
  display: flex;
  align-items: center;
`

const BottomSection = styled(Section)`
  display: flex;
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

const FullImage = ({ onClose, image }) => (
  <Overlay onButtonPress={onClose}>
    <Image src={image} height={'86%'} />
  </Overlay>
)

const Images = ({ images, onImageClick }) =>
  images.map((imagePath, i) => {
    const fullPath = `http://localhost:5000${imagePath}`
    return (
      // <SuperImage imagePath={fullPath} />
      <Image onClick={() => onImageClick(fullPath)} key={i} src={fullPath} />
    )
  })

export const ImageView = enhance(
  ({
    images,
    activeImage,
    setActiveImage,
    displayCirculation,
    setDisplayCirculation,
  }) => {
    // If there is not a active image and there is not a image circulation currently active
    const shouldDisplayGalleryBar = !activeImage && !displayCirculation

    // If there is images loaded and the user has chosen to display the image circulation
    const shouldDisplayImageCirculation = images.length && displayCirculation

    // If the user has clicked on a image
    const shouldDisplayFullImage = activeImage
    return (
      <ImageContainer>
        <TopSection flex={1}>
          {shouldDisplayGalleryBar && (
            <Bar
              onButtonPress={() => setDisplayCirculation(true)}
              Icon={PlayButtonWithLeftMargin}
            />
          )}
        </TopSection>
        <BottomSection
          flex={6}
          className="bottom"
          style={{ backgroundColor: 'purple' }}
        >
          {shouldDisplayImageCirculation && (
            <ImageCirculation
              images={images}
              onStop={() => setDisplayCirculation(false)}
            />
          )}
          {shouldDisplayFullImage ? (
            <FullImage onClose={() => setActiveImage('')} image={activeImage} />
          ) : (
            <Images
              images={images}
              onImageClick={image => setActiveImage(image)}
            />
          )}
        </BottomSection>
      </ImageContainer>
    )
  },
)

export const Image = ({ src, onClick }) => (
  <ImageWrapper>
    <CustomImage src={src} onClick={onClick} />
  </ImageWrapper>
)

const CustomImage = styled.img`
  width: 100%;
  height: auto;
`
const ImageWrapper = styled.div`
  width: 312px;
  max-height: 206px;
  background-color: rgba(60, 40, 1, 0.5);
  margin: 3px;
`
// const Image = ({ imagePath }) => {
//   return (
//     <ImageWrapper>
//       <SuperDiv src={imagePath} />
//     </ImageWrapper>
//   )
// }
