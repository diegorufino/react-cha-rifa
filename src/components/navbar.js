import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Navbar = props => {
    const { history } = props;

    const logout = () => {
        localStorage.removeItem('login')
        localStorage.removeItem('email_usuario_logado')
        history.push('/login')
    }

    const login = localStorage.getItem('login')
    const user = localStorage.getItem('email_usuario_logado')

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/">Chá Rifa</a>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    {login ?
                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/consulta-apostas">Lista de Apostas</Link>
                    </li>
                    :
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    }
                </ul>
                {login &&
                <form className="d-flex">
                    <label className="nav-link" type="text"> {user} </label>
                    <button
                        className="btn btn-secondary my-2 my-sm-0"
                        type="button"
                        onClick={logout}>
                        Logout
                    </button>
                </form>}
            </div>
        </nav>
    )
}

export default withRouter(Navbar);