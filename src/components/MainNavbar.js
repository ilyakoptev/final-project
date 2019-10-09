import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

class MainNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToHome: false
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.handleLogout();

        if (window.location.hash != "#/") {
            this.setState({redirectToHome: true})
        }
    }

    // // this function in onvoked after every render (but not the first)
    // componentDidUpdate() {
    //     if (this.state.redirectToHome) {
    //         this.setState({redirectToHome: false})
    //     }
    // }

    

    render() {
        const { activeUser } = this.props;
        const { redirectToHome } = this.state;

        if (redirectToHome) {
            return <Redirect to="/"/>
        }

        const signupLink = !activeUser ? <Nav.Link href="#/signup">Signup</Nav.Link> : null;
        const loginLink = !activeUser ? <Nav.Link href="#/login">Login</Nav.Link> : null;
        const logoutLink = activeUser ? <Nav.Link onClick={this.logout}>Logout</Nav.Link> : null;


        return (
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

            <Navbar bg="light" expand="lg">
               <Navbar.Brand href="#home">Flower Company</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Nav.Link href="#home">Orders from Customers</Nav.Link>
                        <Nav.Link href="#link">Order to Suppliers</Nav.Link> */}
                        <NavDropdown title="Customers" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Create New Order</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Add New Customer</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Edit Exist Customer</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Show Customers</NavDropdown.Item>
                       </NavDropdown>
                        <NavDropdown title="Suppliers" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Create New Order from Supliers</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Add New Supplier</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Edit Exist Supplier</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Show suppliers</NavDropdown.Item>
                       </NavDropdown>
                       <NavDropdown title="Products" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Add New Product</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Edit Exist Product</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Delete Product</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Show Products</NavDropdown.Item>
                       </NavDropdown>
                       <NavDropdown title="Accounts" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">New Reciept from Customer</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">New Payment to Supplier</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Customers balance</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Supplier balance</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Show Final Saldo</NavDropdown.Item>
                       </NavDropdown>
                   </Nav>
                    <Nav className="ml-auto">
                         {signupLink}
                         {loginLink}
                         {logoutLink}
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