import React from 'react'
import { render } from 'react-dom'
import { App } from './components/App'
import { css, Global } from '@emotion/core'

const globalStyle = css`
  html {
    font-family: Arial, Helvetica, sans-serif;
  }

  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`

render(
  <>
    <Global styles={globalStyle} />
    <App />
  </>,
  document.getElementById('app')
)