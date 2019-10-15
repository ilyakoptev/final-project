import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import DashBoard from './pages/DashBoard';
//import MainNavbar from './components/MainNavbar';
//import customerorders from './data/customerorders';
//import employees from './data/employees'
//import customers from './data/customers'

class App extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
     
    }

     this.handleLogout = this.handleLogout.bind(this);
     this.handleLogin = this.handleLogin.bind(this);
   
  }
 
  handleLogin(user){
    this.setState({activeUser:user})
    console.log(user)
  }
  
  handleLogout() {
    this.setState({activeUser: null});
  }

  render(){
  const {activeUser} = this.state
  return (
    <Container>
     <Switch>
        <Route exact path="/">
          <HomePage activeUser={activeUser}  handleLogin={this.handleLogin}/>
        </Route>
        <Route exact path="/dashboard">
          <DashBoard activeUser={activeUser}  handleLogout={this.handleLogout}/>
        </Route>
        {/* <Route path="/recipes">
          <RecipesPage />
        </Route> */}
      </Switch>
    </Container>
  );
}
}

export default App;
