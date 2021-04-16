import React from 'react'
import ReactDOM from 'react-dom'

import 'bootswatch/dist/minty/bootstrap.min.css'
import './index.css'
import App from './App'

import axios from 'axios'

axios.get('http://localhost:3000/apostas').then(response => {
    console.log(response.data)
})

ReactDOM.render(<App />, document.getElementById('root'));
