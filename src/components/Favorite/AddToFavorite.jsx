import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import remote from '../../api/requsetHandler';

class AddToFavorite extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: localStorage.getItem('username'),
            movieId: '',
            movieName: '',
            movieTrailer: '',
            isWatched: false
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    async  onSubmitHandler(e) {
        e.preventDefault()
        await remote.getMovie(this.props.props._id).then(res => {
            this.setState({ movieId: res._id })
            this.setState({ movieName: res.movieName })
            this.setState({ movieTrailer: res.movieTrailer })
        })
        await remote.addOrUpdateFavoriteMovie(this.props.props._id, this.state)

        this.props.history.push('/favoriteMovies')
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <input type="submit" value="Add to Favorite" />
                </form>
            </div>
        )
    }
}

export default withRouter(AddToFavorite)
