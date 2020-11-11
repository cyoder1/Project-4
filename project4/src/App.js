import './App.css';
import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SignUp from './components/SignUp'
import Profile from './components/Profile'

import {registerUser, loginUser, verifyUser, allCities} from './services/api_helper';

class App extends Component {
  constructor() {
    super();

    this.state = {
      userProjects:[
        {
          projectId: 0,
          name: "Cabinet",
          class: "Woodworking",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCvAa_bhgHkfNJY1Rkrs4RrAnBcofeWGm1hteVXUd3_1fNbP_epwrjcHdh1w&usqp=CAc",
          user_project_id: 3
        },
        {
          projectId: 0,
          name: "Cabinet2",
          class: "Woodworking",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCvAa_bhgHkfNJY1Rkrs4RrAnBcofeWGm1hteVXUd3_1fNbP_epwrjcHdh1w&usqp=CAc",
          user_project_id: 3
        }
      ],
      projectUpdate:[
        {
        updateId: 1,
        description: "Cut wood to size",
        date: "10/12/2020",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgf2y-goxUxXhTtyXMqPuWLg5HczMm07LxAQ&usqp=CAU",
        project_update_id: 4
        }
      ],
      projectCost: [
        {
        costId: 7,
        description: "purchased materials",
        amount: 30.00,
        project_cost_id: 11
        }
      ],
      loggedInUser: {
        name: "Random User",
        email: "random@email.com",
        username: "username",
        password: "password",
        userProjects:[
          {
            projectId: 0,
            name: "Cabinet",
            class: "Woodworking",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCvAa_bhgHkfNJY1Rkrs4RrAnBcofeWGm1hteVXUd3_1fNbP_epwrjcHdh1w&usqp=CAc",
            user_project_id: 3
          },
          {
            projectId: 0,
            name: "Cabinet3",
            class: "Woodworking",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCvAa_bhgHkfNJY1Rkrs4RrAnBcofeWGm1hteVXUd3_1fNbP_epwrjcHdh1w&usqp=CAc",
            user_project_id: 3
          }
        ],
        projectUpdate:[
          {
          updateId: 1,
          description: "Cut wood to size",
          date: "10/12/2020",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgf2y-goxUxXhTtyXMqPuWLg5HczMm07LxAQ&usqp=CAU",
          project_update_id: 4
          }
        ],
        projectCost: [
          {
          costId: 7,
          description: "purchased materials",
          amount: 30.00,
          project_cost_id: 11
          }
        ],
      },
      selected: null
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

  handleSignUp = async (e, registerData) => {
    e.preventDefault();
    const loggedInUser = await registerUser(registerData);
    this.setState({loggedInUser});
    this.props.history.push('/profile')
  }

  handleProjectSelection = (e, pick) => {
    e.preventDefault()
    console.log(pick)
    console.log("Selected!!!")
    let selected = this.state.selected
    selected= pick
    this.setState({
      selected
    })
    console.log(this.state.loggedInUser.userProjects[selected-1].name)
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
                    handleProjectSelection={this.handleProjectSelection}       
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
