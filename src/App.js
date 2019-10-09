import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import DashBoard from './pages/DashBoard';
import MainNavbar from './components/MainNavbar';
import customerorders from './data/customerorders';
import employees from './data/employees'
import customers from './data/customers'

class App extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
    //   activeUser:   {
    //     "id": 1,
    //     "fname": "Nir",
    //     "lname": "Channes",
    //     "email": "nir@nir.com",
    //     "pwd": "123"
    // },
      employees: employees,
      customers: customers,
      customerorders: []
      // hack for starting with my recipes
      // activeUserRecipes: jsonRecipes.filter(recipe => recipe.userId === 1)
    }

     this.handleLogout = this.handleLogout.bind(this);
     this.handleLogin = this.handleLogin.bind(this);
    // this.addRecipe = this.addRecipe.bind(this);

    // console.log(this.state.allRecipes);
  }
  handleLogin(user){
    this.setState({activeUser:user})
    console.log(user)
  }
  
  handleLogout() {
    this.setState({activeUser: null});
  }

  render(){
  const {activeUser,customers} = this.state
  return (
    <Container>
     <Switch>
        <Route exact path="/">
          <HomePage activeUser={activeUser} employees={employees} handleLogin={this.handleLogin}/>
        </Route>
        <Route exact path="/dashboard">
          <DashBoard activeUser={activeUser} employees={employees} handleLogout={this.handleLogout}/>
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
