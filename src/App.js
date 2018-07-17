import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
// import { LocalStorage } from './client/storage/LocalStorage'

import LoginPage from './pages/login/LoginPage'
import EventsPage from './pages/events/EventsPage'
import NewEventPage from './pages/events/NewEventPage'
import EditEventPage from './pages/events/EditEventPage'
import RafflesPage from './pages/raffles/RafflesPage'
import EditRafflePage from './pages/raffles/EditRafflePage'
import UsersPage from './pages/users/UsersPage'
import BartolosPage from './pages/bartolos/BartolosPage'
import DashboardPage from './pages/dashboard/DashboardPage'
// import Auth from './components/security'

class App extends Component {

  render() {
//      const storage = new LocalStorage()
//      const login = storage.get('login')
//      const token = login ? login.token : login
//      const Secured = Auth(LoginPage)(token)
//              <Route exact path='/' render={Secured(DashboardPage)} />
      return (
          <Switch>
              <Route exact path='/' component={DashboardPage} />
              <Route exact path='/events' component={EventsPage} />
              <Route path='/events/new' component={NewEventPage} />
              <Route exact path='/events/:id' component={EditEventPage} />
              <Route path='/events/:eventId/raffles/new' component={EditRafflePage} />
              <Route exact path='/raffles' component={RafflesPage} />
              <Route path='/users' component={UsersPage} />
              <Route path='/bartolos' component={BartolosPage} />
              <Route path='/login' component={LoginPage} />
          </Switch>
      );
  }
}

export default App
