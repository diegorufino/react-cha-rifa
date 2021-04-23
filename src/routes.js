import React from 'react'

import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './views/home'

export default () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="" component={Home} />
            </Switch>
        </HashRouter>
    )
}