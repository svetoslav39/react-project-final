import React, { Component } from 'react'
import Input from '../common/Input'
import remote from '../../api/requsetHandler'
import { withRouter } from 'react-router-dom'

class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            isAdmin: false
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
        console.log(this.state)
        if (this.state.password !== this.state.repeatPassword) {
            this.setState({
                error: 'Passwords dont match'
            })
            return
        }
        let username = this.state.username
        let password = this.state.password
        let result = {
            username,
            password
        }
        await remote.register(result).then(res => console.log(res))
        this.props.history.push('/login')
    }

    render() {
        let errors = null
        if (this.state.error) {
            errors = (
                <div>
                    <p className='errorMessage'>{this.state.error}</p>
                </div>
            )
        }
        return (
            <div className='registerContainer'>
                <h1>Register</h1>
                {errors}
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name='username'
                        value={this.state.username}
                        onChange={this.onChangeHandler}
                        label='Username:'
                        id=''
                    />
                    <Input
                        name='password'
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        label='Password:'
                        type='password'
                        id=''
                    />
                    <Input
                        name='repeatPassword'
                        onChange={this.onChangeHandler}
                        label='Repeat password:'
                        type='password'
                        id=''
                    />
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
            </div>
        )
    }
}
export default withRouter(RegisterForm)