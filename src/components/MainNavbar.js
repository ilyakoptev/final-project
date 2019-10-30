import React from 'react'
import '../App.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

class MainNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToHome: false,
            currectUserName: null,
            createNewOrder: false,
            customersEdit: false,
            customersRead: false,
            suppliersRead: false,
            suppliersEdit: false,
            productsRead: false,
            productsEdit: false,
            accountsRead: false,
            accountsEdit: false,
            adminAccess: false,
            show: false,
        }

        this.logout = this.logout.bind(this);
        this.getMenuItem = this.getMenuItem.bind(this);
        this.goToHomePage = this.goToHomePage.bind(this);

    }

    logout() {
        this.props.handleLogout();
        this.setState({redirectToHome: true})
        
    }

    componentDidMount(){
      // const {activeUser} = this.props;
       const { activeUser } = this.props;
       const currectUser = activeUser // employees[0].data.find( (item)=> {if (item.EmployeeId == activeUser) return item.Name} ) //get all data of currect user 
       this.setState({currectUserName: currectUser.Name}) // get a current user name 
       console.log(currectUser)
        switch(currectUser.Position) {
            case "1":
                this.setState({ createNewOrder: true})
            this.setState({ customersRead: true})
                this.setState({ customersEdit: true})
                    this.setState({ suppliersRead: true})
                        this.setState({ suppliersEdit: true})
                            this.setState({  productsRead: true})
                                this.setState({ productsEdit: true})
                                    this.setState({ accountsRead: true})
                                        this.setState({   accountsEdit: true})
              break;
            case "2":
                this.setState({ createNewOrder: true})
                this.setState({ customersRead: true})
                    this.setState({ customersEdit: false})
                        this.setState({ suppliersRead: true})
                            this.setState({ suppliersEdit: false})
                                this.setState({  productsRead: true})
                                    this.setState({ productsEdit: false})
                                        this.setState({ accountsRead: false})
                                            this.setState({   accountsEdit: false})
              break;
              case "3":  // permission for position "3"
              this.setState({ createNewOrder: false})
              this.setState({ customersRead: true})
                  this.setState({ customersEdit: false})
                      this.setState({ suppliersRead: true})
                          this.setState({ suppliersEdit: false})
                              this.setState({  productsRead: true})
                                  this.setState({ productsEdit: false})
                                      this.setState({ accountsRead: true})
                                          this.setState({   accountsEdit: true})
              break;
              case "4":
                this.setState({ createNewOrder: false})
                this.setState({ customersRead: false})
                    this.setState({ customersEdit: false})
                        this.setState({ suppliersRead: false})
                            this.setState({ suppliersEdit: false})
                                this.setState({  productsRead: false})
                                    this.setState({ productsEdit: false})
                                        this.setState({ accountsRead: false})
                                            this.setState({   accountsEdit: false})
              break;
              case "5": // admin accesss 
                this.setState({ createNewOrder: true})
            this.setState({ customersRead: true})
                this.setState({ customersEdit: true})
                    this.setState({ suppliersRead: true})
                        this.setState({ suppliersEdit: true})
                            this.setState({  productsRead: true})
                                this.setState({ productsEdit: true})
                                    this.setState({ accountsRead: true})
                                        this.setState({   accountsEdit: true})
                                        this.setState({   adminAccess: true})
                                        
              break;
            default:  
            this.setState({ createNewOrder: false})
            this.setState({ customersRead: false})
                this.setState({ customersEdit: false})
                    this.setState({ suppliersRead: false})
                        this.setState({ suppliersEdit: false})
                            this.setState({  productsRead: false})
                                this.setState({ productsEdit: false})
                                    this.setState({ accountsRead: false})
                                        this.setState({   accountsEdit: false})
          }
    }
    getMenuItem(e){
        this.props.setMenuChooseState(e.target.id) //id of menu item
        console.log(e.target.id)
    }

    goToHomePage(){
        return <Redirect to="/"/>
    }
    render() {
       
        const {createNewOrder,redirectToHome, customersEdit, customersRead, suppliersEdit, suppliersRead, productsEdit, productsRead, accountsEdit,accountsRead,adminAccess} = this.state;

        if (redirectToHome) {
            return <Redirect to="/"/>
        }
       
        
        let navCustomers 
        if (!customersEdit&&!customersRead)  // if no permession do not show all block of navbar at all 
            navCustomers = ""
        else  {
            let newCustomerOrder = createNewOrder ? <NavDropdown.Item id ="createNewCustOrder" className="font-weight-bold text-success"  onClick={this.getMenuItem}>Create New Order</NavDropdown.Item> : ""
            let showAllCustomerOrders = createNewOrder ? <NavDropdown.Item id ="showAllCustomerOrders" className="text-info" onClick={this.getMenuItem}>Show All Exists Orders</NavDropdown.Item> : ""
            let addNewCustomer = customersEdit ? <NavDropdown.Item id ="addNewCustomer" className="text-success" onClick={this.getMenuItem}>Add New Customer</NavDropdown.Item> : ""
            let editCustomer = customersEdit ?  <NavDropdown.Item id ="editCustomer" className="text-warning" onClick={this.getMenuItem}>Edit Exists Customer</NavDropdown.Item>: ""
            let showCustomers = customersRead ?  <NavDropdown.Item id ="showCustomers"  className="text-info" onClick={this.getMenuItem}>Show Customers</NavDropdown.Item> : ""
            navCustomers=  <Nav className="mr-auto">
                            <NavDropdown  title="Customers" id="navCustomers"> 
                            {newCustomerOrder}
                            {showAllCustomerOrders}
                            <NavDropdown.Divider />
                            {addNewCustomer}
                            {editCustomer}
                             <NavDropdown.Divider />
                            {showCustomers}
                          </NavDropdown> </Nav>}
        let navSuppliers
        if (!suppliersEdit&&!suppliersRead)  
             navSuppliers = ""
        else {
            let createSuppOrder = suppliersEdit ?  <NavDropdown.Item id ="createNewSuppOrder" className="font-weight-bold text-success" onClick={this.getMenuItem}>Create New Order from Suppliers</NavDropdown.Item> : "" 
            let showAllSuppOrders = suppliersEdit ?  <NavDropdown.Item id ="showAllSuppOrders" className="text-info"  onClick={this.getMenuItem}>Show all Orders</NavDropdown.Item> : "" 
            let addNewSupplier = suppliersEdit ?  <NavDropdown.Item id ="addNewSupplier" className="text-success" onClick={this.getMenuItem}>Add New Supplier</NavDropdown.Item> : ""
            let editSupplier = suppliersEdit ?  <NavDropdown.Item id ="editSupplier" className="text-warning"  onClick={this.getMenuItem}>Edit Exist Supplier</NavDropdown.Item> : ""
            let showSuppliers = suppliersRead ?  <NavDropdown.Item id ="showSuppliers" className="text-info" onClick={this.getMenuItem}>Show suppliers</NavDropdown.Item> : ""
            navSuppliers = <Nav className="mr-auto">
                            <NavDropdown title="Suppliers" id="basic-nav-dropdown">  
                            {createSuppOrder}
                            {showAllSuppOrders}
                            <NavDropdown.Divider />
                            {addNewSupplier}
                            {editSupplier}
                            <NavDropdown.Divider />
                            {showSuppliers}
                             </NavDropdown> </Nav> }
         let navProducts
         if (!productsEdit&&!productsRead)  
             navProducts = ""
         else {
             let addProduct = productsEdit ?  <NavDropdown.Item id ="addNewProduct" className="text-success" onClick={this.getMenuItem}>Add New Product</NavDropdown.Item> : "" 
             let editProduct = productsEdit ?   <NavDropdown.Item id ="editProduct" className="text-warning" onClick={this.getMenuItem}>Edit Exist Product</NavDropdown.Item> : ""
             let showProducts = productsRead ?   <NavDropdown.Item id ="showProducts" className="text-info" onClick={this.getMenuItem}>Show Products</NavDropdown.Item> : ""
             navProducts = <Nav className="mr-auto">
                             <NavDropdown title="Products" id="basic-nav-dropdown">
                                  {addProduct}
                                  {editProduct}
                                  <NavDropdown.Divider />
                                  {showProducts}
                             </NavDropdown>
                             </Nav> }
        let navAccounts
        if (!accountsEdit&&!accountsRead)  
            navAccounts = ""
        else {
            let createReciept = accountsEdit ?  <NavDropdown.Item id ="newReciept" className="text-success" onClick={this.getMenuItem}>New Reciept from Customer</NavDropdown.Item> : "" 
            let customerBalance = accountsRead?   <NavDropdown.Item id ="custBalance" className="text-warning" onClick={this.getMenuItem}>Customers balance</NavDropdown.Item> : ""
            let createPayment = accountsEdit ?   <NavDropdown.Item id ="newPayment" className="text-success" onClick={this.getMenuItem}>New Payment to Supplier</NavDropdown.Item> : ""
            let SupplierBalance = accountsRead ?    <NavDropdown.Item id ="suppBalance" className="text-warning" onClick={this.getMenuItem}>Supplier balance</NavDropdown.Item> : ""
            let customerDocuments = accountsRead ?    <NavDropdown.Item id ="custDocs" className="text-info" onClick={this.getMenuItem}>All Customer documents</NavDropdown.Item> : ""
            let SupplierDocuments = accountsRead ?    <NavDropdown.Item id ="suppDocs" className="text-info" onClick={this.getMenuItem}>All Supplier documents</NavDropdown.Item> : ""
           
            let showSaldo = accountsEdit ?     <NavDropdown.Item id ="showSaldo" onClick={this.getMenuItem}>Show Final Saldo</NavDropdown.Item> : ""
           
           navAccounts = <Nav className="mr-auto">
                            <NavDropdown title="Accounts" id="navAccounts">
                                 {createReciept}
                                 {customerBalance}
                                 {customerDocuments}
                                 <NavDropdown.Divider />
                                 {createPayment}
                                 {SupplierBalance}
                                 {SupplierDocuments}
                                 <NavDropdown.Divider />
                                 {showSaldo}
                            </NavDropdown>
                            </Nav>  }
           let navEmployees 
           if (!adminAccess)
               navEmployees = ""
           else {
               navEmployees = <Nav className="mr-auto">
                             <NavDropdown title="Employees" id="basic-nav-dropdown">
                                      <NavDropdown.Item id ="addNewEmployee" className="text-success" onClick={this.getMenuItem}>Add new Employee</NavDropdown.Item>
                                      <NavDropdown.Item id ="editEmployee" className="text-warning" onClick={this.getMenuItem}>Edit exists Employee</NavDropdown.Item>
                                      <NavDropdown.Item id ="deleteEmployeer" className="text-danger" onClick={this.getMenuItem}>Delete Employee</NavDropdown.Item>
                                      <NavDropdown.Divider />
                                      <NavDropdown.Item id ="showEmployees" className="text-info" onClick={this.getMenuItem}>Show All Employees</NavDropdown.Item>
                                 </NavDropdown>
                              </Nav>
           }    
        
       return (
               <Navbar bg="light" expand="lg">
               <Navbar.Brand  onClick={this.goToHomePage}>Flowers LTD</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                       {navCustomers}
                       {navSuppliers}
                       {navProducts}
                       {navAccounts}
                       {navEmployees}
                       <Nav className="ml-auto">
                          <Nav.Link onClick={this.logout} ><span className="text-danger">   Logout {this.state.currectUserName} </span></Nav.Link>
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