import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { LocalStorage } from './client/storage/LocalStorage'
import LoginPage from './pages/login/LoginPage'
import EventsPage from './pages/events/EventsPage'
import NewEventPage from './pages/events/NewEventPage'
import EditEventPage from './pages/events/EditEventPage'
import RafflesPage from './pages/raffles/RafflesPage'
import EditRafflePage from './pages/raffles/EditRafflePage'
import NewRafflePage from './pages/raffles/NewRafflePage'
import UsersPage from './pages/users/UsersPage'
import BartolosPage from './pages/bartolos/BartolosPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import Auth from './components/security'

class App extends Component {

    render() {
        const storage = new LocalStorage()
        const login = storage.get('login')
        const token = login ? login.token : login
        const Secured = Auth(LoginPage)(token)

        return (
            <Switch>
                <Route exact path='/' component={Secured(DashboardPage)} />
                <Route exact path='/events' component={Secured(EventsPage)} />
                <Route path='/events/new' component={Secured(NewEventPage)} />
                <Route exact path='/events/:id' component={Secured(EditEventPage)} />

                <Route exact path='/raffles' component={Secured(RafflesPage)} />
                <Route path='/raffles/new/:eventId' component={Secured(NewRafflePage)} />
                <Route exact path='/raffles/:id' component={Secured(EditRafflePage)} />

                <Route path='/users' component={Secured(UsersPage)} />
                <Route path='/bartolos' component={Secured(BartolosPage)} />
                <Route path='/login' component={LoginPage} />
            </Switch>
        );
    }
}

export default App
