import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import remote from '../../api/requsetHandler';


class PublicMovie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: {}
        }
        this.onRedirectMovie = this.onRedirectMovie.bind(this)
    }
    async componentDidMount() {
        await remote.getCommentsMovie(this.props.props._id).then(res => {
            this.setState({ comments: res })
        })
    }
    onRedirectMovie(e) {
        e.preventDefault()
        this.props.history.push(`/PublicdbMovies/${this.props.props._id}`)
    }
    render() {
        return (
            <article>
                <div>
                    <NavLink to='' onClick={this.onRedirectMovie}>{this.props.props.movieName}</NavLink>
                </div>
                <img src={this.props.props.moviePoster} alt={this.props.props.movieName} />
            </article>
        )
    }

}
export default withRouter(PublicMovie)