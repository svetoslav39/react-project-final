import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import remote from '../../api/requsetHandler';
import Comment from '../Comments/Comment';


class Movie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: {},
            comments: []
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
        this.props.history.push(`/dbMovies/${this.props.props._id}`)
    }
    adminDeleteMovie = () => {
        remote.adminDeleteMovie(this.props.props._id).then(res => console.log(res))
        this.props.history.push(`/dbMovies`)
    }
    render() {
        return (
            <article>
                <div>
                    <NavLink to='' onClick={this.onRedirectMovie}>{this.props.props.movieName}</NavLink>
                </div>
                <img src={this.props.props.moviePoster} alt={this.props.props.movieName} />
                {localStorage.getItem('userId') === '5b448b32bd5eaf2e6d0305ff'
                    ?
                    <input onClick={this.adminDeleteMovie} type="button" value="Delete" /> :
                    null
                }
                <div id='commentWrapper'>
                    <h5>Comments:</h5>
                    {this.state.comments != '' ? this.state.comments.map(comment => {
                        return <Comment key={comment._id} props={comment} />
                    }) : <p>no comments</p>}
                </div>
            </article>
        )
    }

}
export default withRouter(Movie)