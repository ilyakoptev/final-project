import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

class MainNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToHome: false,
            permission: null,
            permissionRead: false,
            permissionWrite: false,
            permissonView: false,
            show: false,
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.handleLogout();
        this.setState({redirectToHome: true})
        
    }

    // // this function in onvoked after every render (but not the first)
    // componentDidUpdate() {
    //     if (this.state.redirectToHome) {
    //         this.setState({redirectToHome: false})
    //     }
    // }

    componentDidMount(){
       const {activeUser} = this.props;
        switch(activeUser) {
            case "1":
              // code block
              break;
            case "2":
              // code block
              break;
              case "3":
              // code block
              break;
              case "4":
              // code block
              break;
             
            default:  // admin - full access 
              this.setState({permisson: "full"})
              this.setState({permissionRead: true})
              this.setState({permissionWrite: true})
              this.setState({permissonView: true})
          }
    }

    render() {
        const { activeUser , employees } = this.props;
        const { redirectToHome } = this.state;

        if (redirectToHome) {
            return <Redirect to="/"/>
        }
        const currectUser = employees[0].data.find( (item)=> {if (item.EmployeeId == activeUser) return item.Name} ) //get all data of currect user 
        console.log(currectUser)
      
        let navCustomers = <NavDropdown  title="Customers" id="basic-nav-dropdown"> 
                             <NavDropdown.Item expanded={this.state.show} href="#action/3.1">Create New Order</NavDropdown.Item>
                             <NavDropdown.Item href="#action/3.2">Add New Customer</NavDropdown.Item>
                             <NavDropdown.Item href="#action/3.3">Edit Exist Customer</NavDropdown.Item>
                             <NavDropdown.Divider />
                             <NavDropdown.Item href="#action/3.4">Show Customers</NavDropdown.Item>
                          </NavDropdown>
      
        return (
           

            <Navbar bg="light" expand="lg">
               <Navbar.Brand href="#home">Flower Company</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {navCustomers}
                         {/* <NavDropdown  title="Customers" id="basic-nav-dropdown"> 
                            <NavDropdown.Item expanded={this.state.show} href="#action/3.1">Create New Order</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Add New Customer</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Edit Exist Customer</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Show Customers</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav className="mr-auto">
                        <NavDropdown title="Suppliers" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Create New Order from Supliers</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Add New Supplier</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Edit Exist Supplier</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Show suppliers</NavDropdown.Item>
                       </NavDropdown>
                    </Nav>
                    <Nav className="mr-auto">
                       <NavDropdown title="Products" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Add New Product</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Edit Exist Product</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Delete Product</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Show Products</NavDropdown.Item>
                       </NavDropdown>
                    </Nav>
                    <Nav className="mr-auto">
                       <NavDropdown title="Accounts" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">New Reciept from Customer</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">New Payment to Supplier</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Customers balance</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Supplier balance</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Show Final Saldo</NavDropdown.Item>
                       </NavDropdown>
                       
                   </Nav>
                   <Nav className="mr-auto">
                   <NavDropdown title="Employees" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Add new Employee</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Edit exists Employee</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Delete Employee</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Show All Employees</NavDropdown.Item>
                       </NavDropdown>
                    </Nav>
                    <Nav className="ml-auto">
                       <Nav.Link onClick={this.logout} ><span class="text-danger">   Logout {currectUser.Name} </span></Nav.Link>
                    </Nav>
            {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form> */}
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default MainNavbar;