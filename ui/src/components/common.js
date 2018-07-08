import styled from 'styled-components'

const sizes = {
  small: '0.8em',
  medium: '1.5em',
  large: '2em',
}

export const Text = styled.p`
  font-size: ${props => (props.size ? sizes[props.size] : sizes.medium)};
  color: ${props => (props.color ? props.color : '#d8d8d8')};
`
