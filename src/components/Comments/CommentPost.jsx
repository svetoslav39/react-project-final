import React, { Component } from 'react'
import Input from '../common/Input';
import remote from '../../api/requsetHandler';
import { withRouter } from 'react-router-dom'

 class CommentPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: localStorage.getItem('username'),
            movieId: '',
            comment: ''
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onChangeHandler = e => {
        let inputName = e.target.name
        let inputValue = e.target.value
        this.setState({ [inputName]: inputValue })
        this.setState({ movieId: this.props.props })
    }
    async onSubmitHandler(e) {
        e.preventDefault()
        await remote.postComment(this.state)
        this.props.history.push('/dbMovies/')
    }

    render() {
        return (

            <form onSubmit={this.onSubmitHandler} >
                <Input
                    name='comment'
                    onChange={this.onChangeHandler}
                    label='Comment:'
                />
                <input type="submit" value="Post Comment" />
            </form>
        )
    }
}
export default withRouter(CommentPost)
