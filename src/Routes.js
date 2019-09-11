import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import User from './pages/User';
import Projects from './pages/Projects';
import { history } from "./services/helpers"

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/user' component={User} />
                <Route exact path='/projects/:id' component={Projects} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default Routes;