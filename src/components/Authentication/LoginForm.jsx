import React, { Component } from 'react'
import Input from '../common/Input'
import remote from '../../api/requsetHandler'
import { withRouter } from 'react-router-dom'

class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onChangeHandler = e => {
        let inputName = e.target.name
        let inputValue = e.target.value
        this.setState({ [inputName]: inputValue })
    }

    async onSubmitHandler(e) {
        e.preventDefault()
        await remote.login(this.state).then(res => {
            if (res.error) {
                this.setState({ error: res.error })
                return
            }
            localStorage.setItem('token', res._kmd.authtoken)
            localStorage.setItem('userId', res._id)
            localStorage.setItem('username', res.username)
            this.props.history.push('/dbMovies')
        })
    }

    render() {
        return (
            <div className='loginContainer'>
                <h1>Login</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name='username'
                        value={this.state.username}
                        onChange={this.onChangeHandler}
                        label='Username:'
                    />
                    <Input
                        name='password'
                        type='password'
                        // value={this.state.pasword}
                        onChange={this.onChangeHandler}
                        label='Password:'
                    />
                    <input type="submit" className="btn btn-primary" value="Login" />

                </form>
            </div>
        )
    }
}
export default withRouter(LoginPage)