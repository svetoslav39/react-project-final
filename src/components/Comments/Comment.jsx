import React, { Component } from 'react'
import dateConvert from '../../api/dateConvertor'
import remote from '../../api/requsetHandler'
import { withRouter } from 'react-router-dom'

class Comment extends Component {

    adminDeleteComment = () => {
        remote.adminDeleteComment(this.props.props._id).then(res => console.log(res))
        this.props.history.push('/dbMovies')
    }
    render() {
        return (
            <div>
                <p>{this.props.props.comment}</p>
                <span>
                    posted: {dateConvert(this.props.props._kmd.lmt)} ago by {this.props.props.username}
                </span>
                {localStorage.getItem('userId') === '5b448b32bd5eaf2e6d0305ff'
                    ?
                    <input onClick={this.adminDeleteComment} type="button" value="Delete" /> :
                    null
                }
            </div>
        )
    }
}
export default withRouter(Comment)