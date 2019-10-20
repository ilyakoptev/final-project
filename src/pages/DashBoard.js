import React from 'react'
import MainNavbar from '../components/MainNavbar'
import MainWindow from '../components/MainWindow'
import { Container, Row, Col, Button, Modal, Form, Image } from 'react-bootstrap'
import { Redirect, Switch, Route } from 'react-router-dom'
//import RecipeCard from '../components/RecipeCard'


class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            menuChoose: null,
        }

         this.setMenuChooseState = this.setMenuChooseState.bind(this);


    }

    setMenuChooseState(item){   // set what was choosed in main menu 
        this.setState({menuChoose:item})
    }
       
    render() {
        const {activeUser,handleLogout, employees} = this.props;
        const {menuChoose} = this.state;

        if (!activeUser) {
            return <Redirect to="/" />
        }
        return (
            
               
               <Container>
               
                  <MainNavbar activeUser={activeUser}  employees={employees} handleLogout={handleLogout} setMenuChooseState={this.setMenuChooseState}/>
                  
                  <MainWindow activeUser={activeUser} employees={employees} menuChoose={menuChoose}/>
               

        
                </Container>

               
          )  }
}

export default DashBoard;