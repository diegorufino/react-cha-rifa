import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Home from './views/home'
import ConsultaApostas from './views/admin/apostas'
import Login from './views/login'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/consulta-apostas" component={ConsultaApostas} />
            <Route exact path="/login" component={Login} />
        </Switch>
    )
}

export default Routes;