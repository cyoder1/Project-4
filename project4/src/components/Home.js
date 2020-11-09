import React from 'react';
import {Link} from 'react-router-dom';

const Home = (props) => {
    return(
        <div>
            <div>
                <p>Hompage</p>
                <img className="homePic" src="https://images.unsplash.com/photo-1579618215542-2ed5e10b65ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"></img>
                <div>
                    <form className="logInBox">
                        <h3>Log in</h3>
                        <input type = "text" placeholder = "Username" 
                        // onChange = {this.onChange}
                        />
                        <input type = "text" placeholder = "Password" 
                        // onChange = {this.onChange}
                        />
                        <input type = "submit"  value = "Sign in"
                        // onChange = {this.onChange}
                        />
                    </form>
                    <p>Or sign up</p><Link className="signUpLink" to="/signup">Here</Link>
                </div>
             </div>
        </div>
    )
}

export default Home;