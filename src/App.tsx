import * as React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { routes, guestHome, adminHome } from './util/routes'
import { MeComponent } from './generated/graphql'
import { Loading } from './components/pages/Loading'
import { logout } from './util/auth'

export const App = () => (
  <MeComponent>
    {({ loading, data }) => {
      if (loading) return <Loading />
      if (!data || !data.me) logout()
      const home = data!.me!.place ? guestHome : adminHome

      return (
        <Router>
          {routes.map(route => (
            <Route
              key={route.key}
              path={route.path}
              component={route.component}
              exact
            />
          ))}
          <Route path="/" exact component={() => <Redirect to={home.path} />} />
        </Router>
      )
    }}
  </MeComponent>
)
