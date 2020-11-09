import './App.css';
import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SignUp from './components/SignUp'

class App extends Component {
  constructor() {
    super();

    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Route exact path="/"
            render={(props) => {return <Home {...this.state}/> 
            }}
          />
          <Route path="/signup" 
                 render={ (props) => {
                   return <SignUp 
                            handleSignup={this.handleSignup} 
                            {...this.state} />
                 }}
          />
        </main>
      </div>
    );
  }
}
export default withRouter(App);
