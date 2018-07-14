import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout, isAdmin } = this.props
        return (
            <header>
                <h1>Movie DB</h1>
                <ul>
                    <NavLink exact to='/home' activeStyle={{ color: 'red' }}>Home</NavLink>
                    {!loggedIn && <NavLink to='/login' activeStyle={{ color: 'red' }}>Login</NavLink>}
                    {!loggedIn && <NavLink to='/register' activeStyle={{ color: 'red' }}>Register</NavLink>}
                    {isAdmin && <NavLink to='/postMovie' activeStyle={{ color: 'red' }}>Upload movie</NavLink>}
                    {loggedIn && <NavLink to='/dbMovies' activeStyle={{ color: 'red' }}>Database</NavLink>}
                    {!loggedIn && <NavLink to='/PublicdbMovies' activeStyle={{ color: 'red' }}>Database</NavLink>}
                    {loggedIn && <NavLink to='/favoriteMovies' activeStyle={{ color: 'red' }}>Favorite movies</NavLink>}
                    <div id='logged'>
                        <span id='usernameLogged'>{localStorage.getItem('username')}</span>
                        {loggedIn && <a href='javascript:void(0)' onClick={onLogout}>Logout</a>}
                    </div>
                </ul>
            </header>
        )
    }
}