import { CssBaseline } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import RouteHome from './components/RouteHome'
import { createTheme } from './helpers/createTheme'

const App: FunctionComponent = () => {
  return (
    <StylesProvider>
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route component={RouteHome} path={'*'} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
