import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(props){
        super(props)

        this.state=({
            username:"",
            password:""
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <div>
                <div>
                    <h1>Welcome to Hay Down</h1>
                    <img className="homePic" src="https://thewoodwhisperer.com/wp-content/uploads/steves-garage-woodshop-2.jpg"></img>
                        <div>
                            <form onSubmit={(e) => this.props.handleLogin(e, this.state)} className="logInBox" >
                                <h3>Log in</h3>
                                <input 
                                    type = "text" 
                                    name="username" 
                                    value={this.state.username}
                                    placeholder = "Username" 
                                    onChange = {this.onChange}
                                />
                                <input 
                                    type = "password" 
                                    name="password"
                                    value={this.state.password}
                                    placeholder = "Password" 
                                    onChange = {this.onChange}
                                />
                                <input type="submit"  value = "Sign in"
                                onChange = {this.onChange}
                                />
                        </form>
                        <p>Or sign up</p><Link className="signUpLink" to="/signup">Here</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;