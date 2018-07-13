import React from 'react'
import fetch from 'isomorphic-fetch'
import styled from 'styled-components'
import { compose, lifecycle, withState, withHandlers } from 'recompose'

const Image = styled.img`
  height: 43%;
  width: auto;
  margin: 3px;
`

const enhance = compose(
  withState('images', 'setImages', []),
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
        this.props.fetchImages()
      }
    },
  }),
)

export const ImageView = enhance(({ images }) => {
  return (
    <div style={{
      height: '100vh',
      width: '100%',
      overflow: 'scroll',
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}>
      {images.map((imagePath, i) => {
        return <Image key={i} src={`http://localhost:5000${imagePath}`} />
      })}
    </div>
  )
})
