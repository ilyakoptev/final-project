import React from 'react'
import { Redirect } from 'react-router-dom'

class MainWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToHome: false
        }

        //this.logout = this.logout.bind(this);
    }

    
    // // this function in onvoked after every render (but not the first)
    // componentDidUpdate() {
    //     if (this.state.redirectToHome) {
    //         this.setState({redirectToHome: false})
    //     }
    // }

    

    render() {
        const { activeUser, employees } = this.props;
        const { redirectToHome } = this.state;

        if (redirectToHome) {
            return <Redirect to="/"/>
        }
        //console.log(employees)
        const currectUser = employees[0].data.find( (item)=> {if (item.EmployeeId == activeUser) return item.Name} ) //get all data of currect user 
        //console.log(currectUser)
      
        // switch(expression) {
        //     case x:
        //       // code block
        //       break;
        //     case y:
        //       // code block
        //       break;
        //     default:
        //       // code block
        //   } 
      
        return (
            <div>

               
            </div>
            // <Navbar bg="light" expand="lg">
            //     <Navbar.Brand href="#/">Recipe Book</Navbar.Brand>
            //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
            //     <Navbar.Collapse id="basic-navbar-nav">
            //         <Nav className="mr-auto">
            //             <Nav.Link href="#/recipes">Recipes</Nav.Link>
            //         </Nav>
            //         <Nav className="ml-auto">
            //             {signupLink}
            //             {loginLink}
            //             {logoutLink}
            //         </Nav>
            //     </Navbar.Collapse>
            // </Navbar>

            
        );
    }
}

export default MainWindow;