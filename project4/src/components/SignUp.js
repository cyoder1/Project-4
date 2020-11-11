import React, { Component } from 'react';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email:"",
            username: "",
            password: ""
        }
    }

    updateForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="SignUp">
                <h1>Sign Up Page</h1>
                <form onSubmit={(e) => this.props.handleSignUp(e, this.state)}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={this.state.name}
                        onChange={this.updateForm}
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.updateForm}
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={this.state.username}
                        onChange={this.updateForm}
                    />
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.updateForm}
                    />
                    <input type="submit" value="Create Profile" />
                </form>
            </div>
        )
    }
    
}

export default SignUp;