import React, { Component } from 'react';
import { Route, Switch, Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import history from './history'

import Store from './Store'

import Loginpage from './Components/Loginpage'
import Bookoverview from './Components/Bookoverview'
import Navbar from './Components/Navbar'
import Home from './Components/Index'
import Error from './Components/Error'
import Register from './Components/Register'
import Profile from './Components/Profile'
import Logoutpage from './Components/Logoutpage'

class App extends Component {
  constructor(){
    super()
    this.state={
    }
  }
  render() {
      return(
        <Provider store={Store}>
          <Router history={history}>
            <div className="AppContainer">
              <Navbar />
              <Switch>
                  <Route path="/" component={Home} exact/>
                  <Route path="/Books" component={Bookoverview}/>
                  <Route path="/Login" test="hoi" component={Loginpage}/>
                  <Route path="/Register" component={Register}/>
                  <Route path="/Profile" component={Profile}/>
                  <Route path="/Logout" component={Logoutpage}/>
                  <Route component={Error}/>
              </Switch>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
