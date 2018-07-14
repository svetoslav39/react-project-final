import React, { Component } from 'react'
import YouTube from 'react-youtube'
import remote from '../../api/requsetHandler'
import { withRouter } from 'react-router-dom'


class FavoriteMovie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isWatched: null
        }
        this.changeStatus = this.changeStatus.bind(this)
    }

    async changeStatus() {
        await remote.addOrUpdateFavoriteMovie(this.props.props._id, {
            username: localStorage.getItem('username'),
            movieName: this.props.props.movieName,
            movieId: this.props.props.movieId,
            movieTrailer: this.props.props.movieTrailer,
            isWatched: true
        })
            .then(res => console.log(res))
        this.props.history.push('/dbMovies')
    }
    onFavoriteDelete = () => {
        remote.deteleFavoriteMovie(this.props.props._id)
        this.props.history.push('/dbMovies')
    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        }
        return (
            <div>
                <p>{this.props.props.movieName}</p>
                <YouTube
                    videoId={this.props.props.movieTrailer}
                    opts={opts}
                    onReady={this._onReady}
                />
                {this.props.props.isWatched === false ?
                    <input onClick={this.changeStatus} type="button" value="Change to watched" /> :
                    <div>
                        <input onClick={this.changeStatus} type="button" value="Watched" disabled={true} />
                        <input onClick={this.onFavoriteDelete} type="button" value="Delete" />
                    </div>
                }
            </div>
        )
    }
    _onReady(event) {
        event.target.pauseVideo();
    }
}
export default withRouter(FavoriteMovie)