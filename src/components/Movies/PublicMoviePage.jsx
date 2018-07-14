import React, { Component } from 'react'
import YouTube from 'react-youtube'
import remote from '../../api/requsetHandler'


export default class PublicMoviePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieId: this.props.match.params.movieId,
            movie: {}
        }
    }

    async componentDidMount() {
        console.log(this.props.match.params.movieId)
        await remote.getPublicMovie(this.props.match.params.movieId).then(res => {
            this.setState({ movie: res })
        })
    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };
        return (
            <article>
                <h3>{this.state.movie.movieName}</h3>
                <p>{this.state.movie.movieDescription}</p>
                <YouTube
                    videoId={this.state.movie.movieTrailer}
                    opts={opts}
                    onReady={this._onReady}
                />
            </article>
        )
    }
    _onReady(event) {
        event.target.pauseVideo();
    }
}