import React from 'react'
import {compose, mapProps, shouldUpdate} from 'recompose'
import {withFetch} from 'with-fetch'
import fetch from 'isomorphic-fetch'


/**
 *
 * Old implementation, this can be used when with-fetch is fixed..?
 *
 */
// const enhance = compose(
//   mapProps(({location, ...props}) => ({
//     path: location.pathname,
//     ...props
//   })),
//   withFetch(({path}) => fetch(`http://localhost:5000${path}`))
// )
// const StatelessImageView = ({...props}) => {
//   console.log(props.data)
//   return (
//     <div>
//       {props.path}
//     </div>
//   )
// }
// export const ImageView = enhance(StatelessImageView)

export class ImageView extends React.Component {

  componentDidMount() {
    this.fetchImages()
  }

  fetchImages() {
    fetch(`http://localhost:5000${this.props.location.pathname}`)
    .then(res => res.ok ? res : Promise.reject(res))
    .then(res => res.json())
    .then(images => {
      console.log('images', images)
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.fetchImages()
    }
  }

  render() {
    return (
      <div></div>
    )
  }
}


