import './App.css';
import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SignUp from './components/SignUp'
import Profile from './components/Profile'

class App extends Component {
  constructor() {
    super();

    this.state = {

    }
  }

  handleLogin = (e, userInfo) => {
    e.preventDefault();
    console.log('in')
    //need to get user data, compare to existing entries and 
    //IF a match is found - log in ELSE display error message

    this.setState({

    })
    this.props.history.push('/profile')
  }

  handleSignUp = (e, userInfo) => {
    e.preventDefault();
    //need to push userinfo to database
    this.setState({

    })
    this.props.history.push('/profile')
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Route exact path="/"
            render={(props) => 
              {return <Home 
                handleLogin={this.handleLogin}
                {...this.state}/> 
            }}
          />
          <Route path="/signup" 
            render={ (props) => {
              return <SignUp 
                      handleSignUp={this.handleSignUp} 
                      {...this.state} />
            }}
          />
          <Route path="/profile" 
                 render={ (props) => {
                   return <Profile 
                            
                            {...this.state} />
                 }}
          />
        </main>
        <footer>
          <p>Camden Yoder</p>
          <p>&copy; Project Manager App</p>
          <a href="https://github.com/cyoder1/Project-4/issues">Report an Issue</a>
        </footer>
      </div>
    );
  }
}
export default withRouter(App);
