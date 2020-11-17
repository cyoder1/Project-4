import './App.css';
import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SignUp from './components/SignUp'
import Profile from './components/Profile'

import {registerUser, loginUser, verifyUser, allProjects, allCosts} from './services/api_helper';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInUser: null,
      userProjects: null,
      userCosts: null,
      projects: {},
      theNum: null,
    }
  }

  handleLogin = async (e, loginData) => {
    e.preventDefault();
    //console.log('in')
    //need to get user data, compare to existing entries and 
    //IF a match is found - log in ELSE display error message
    const loggedInUser = await loginUser(loginData);
    //console.log(loggedInUser)
    this.setState({ loggedInUser });
    //console.log(loggedInUser.id)
    this.props.history.push('/profile')
  }

//function called to sign in user
  handleSignUp = async (e, registerData) => {
    e.preventDefault();
    const loggedInUser = await registerUser(registerData);
    this.setState({loggedInUser});
    this.props.history.push('/profile')
  }

  //called to log out the user
  handleLogout = () => {
    localStorage.removeItem('authToken');
    this.setState({ loggedInUser: null})
    this.props.history.push('/');
  }

  //retrieves user's list of projects from the backend server
  getProjects = async (id) => {
    const userProjects = await allProjects(id);
    
    this.setState({userProjects: userProjects.data})
  }

  //on refresh logs user back in 
  handleVerify = async () => {
    const loggedInUser = await verifyUser();
    if (loggedInUser) {
      this.setState({ loggedInUser });
      this.props.history.push('/profile');
    }
  }
  //retrieves user's project costs from databse
  getCosts = async (id) => {
    const userCosts = await allCosts(id);
    
    
    this.setState({userCosts: userCosts.data})
    console.log(userCosts)
  }

  componentDidMount() {
    this.handleVerify();
  }

  render() {
    return (
      <div className="App">
        <Header loggedInUser={this.state.loggedInUser} handleLogout={this.handleLogout}/>
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
                    getProjects = {this.getProjects}    
                    handleVerify = {this.handleVerify}
                    getCosts = {this.getCosts}
                    {...this.state} />
                 }}
          />
        </main>
        <footer>
          <p>Camden Yoder</p>
          <p>&copy; Hay Down App</p>
          <a href="https://github.com/cyoder1/Project-4/issues">Report an Issue</a>
        </footer>
      </div>
    );
  }
}
export default withRouter(App);
