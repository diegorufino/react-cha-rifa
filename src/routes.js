import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Home from './views/home'
import ConsultaApostas from './views/admin/apostas'

export default () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/consulta-apostas" component={ConsultaApostas} />
        </Switch>
    )
}