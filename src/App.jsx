import React, { Component } from 'react'
import './style/style.css'
import { Route, Switch, withRouter } from 'react-router-dom'
import LoginForm from './components/Authentication/LoginForm'
import RegisterForm from './components/Authentication/RegisterForm'
import Header from './components/common/Header'
import PostMovie from './components/Movies/PostMovie'
import DatabaseMovies from './components/Movies/DatabaseMovies'
import MoviePage from './components/Movies/MoviePage'
import Home from './components/common/Home'
import FavoriteView from './components/Favorite/FavoriteView'
import PublicDatabaseMovies from './components/Movies/PublicDatabase';
import PublicMoviePage from './components/Movies/PublicMoviePage';

class App extends Component {
  constructor(props) {
    super(props)

    this.onLogout = this.onLogout.bind(this)
  }
  onLogout = () => {
    localStorage.clear()
    this.props.history.push('/')
  }
  render() {
    return (
      <div className="App">
        <Header loggedIn={localStorage.getItem('token') !== null}
          isAdmin={localStorage.getItem('userId') === '5b448b32bd5eaf2e6d0305ff'}
          onLogout={this.onLogout} />
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/postMovie' component={PostMovie} />
          <Route path='/dbMovies/:movieId' component={MoviePage} />
          <Route path='/dbMovies' component={DatabaseMovies} />
          <Route exact path='/PublicdbMovies' component={PublicDatabaseMovies} />
          <Route path='/PublicdbMovies/:movieId' component={PublicMoviePage} />
          <Route path='/favoriteMovies' component={FavoriteView} />
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
