import React from 'react'

import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './views/home'
// import Informacoes from './views/informacoes'

export default () => {
    return (
        <HashRouter>
            <Switch>
            <Route exact path="" component={Home} />
                {/* <Route exact path="/informacoes" component={Informacoes} /> */}
            </Switch>
        </HashRouter>
    )
}