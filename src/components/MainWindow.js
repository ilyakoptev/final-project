/* eslint-disable eqeqeq */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap';
import ShowCustomers from '../components/ShowCustomers'
import customerorders from '../data/customerorders';

class MainWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: [],
            redirectToHome: false,
            customerorders: customerorders,
        }

        //this.logout = this.logout.bind(this);
    }
    componentDidMount(){
        fetch('/getdata')
        .then(res => res.json())
        .then(getData => this.setState({getData}));
      
        //console.log(this.state.getData)
      }
    
    // // this function in onvoked after every render (but not the first)
    // componentDidUpdate() {
    //     if (this.state.redirectToHome) {
    //         this.setState({redirectToHome: false})
    //     }
    // }

    

    render() {
        const { activeUser, employees, menuChoose } = this.props;
        const { redirectToHome } = this.state;
        const currectUser = employees[0].data.find( (item) => {if (item.EmployeeId == activeUser) return item.Name} )  //get all data of currect user 
        if (redirectToHome) {
            return <Redirect to="/"/>
        }
        //console.log(employees)
        
        //console.log(customerorders)
       //conditional rendering by menu item clicked
       switch(menuChoose) {
        case "createNewCustOrder": 
                    
                         return(
                                      <div>Create New Order</div>
                                 )  
                     
        case "addNewCustomer": 
                    {
                         return(
                                      <div>addNewCustomer</div>
                                 )  
                     };
        case "editCustomer": 
          {
               return(
                            <div>editCustomer</div>
                       )  
           };
           case "showCustomers": 
           {
                return(
                             <ShowCustomers/>
                        )  
            };
            case "createNewSuppOrder": 
            {
                 return(
                              <div>createNewSuppOrder</div>
                         )  
             };
             case "editSupplier": 
          {
               return(
                            <div>editSupplier</div>
                       )  
           };
           case "showSuppliers": 
          {
               return(
                            <div>showSuppliers</div>
                       )  
           };
           case "addNewProduct": 
          {
               return(
                            <div>addNewProduct</div>
                       )  
           };
           case "editProduct": 
          {
               return(
                            <div>editProduct</div>
                       )  
           };
           case "deleteProduct": 
          {
               return(
                            <div>deleteProduct</div>
                       )  
           };
           case "showProducts": 
          {
               return(
                            <div>showProducts</div>
                       )  
           }; 
           case "newReciept": 
          {
               return(
                            <div>newReciept</div>
                       )  
           };  
           case "newPayment": 
          {
               return(
                            <div>newPayment</div>
                       )  
           };  
           case "custBalance": 
          {
               return(
                            <div>custBalance</div>
                       )  
           };  
           case "suppBalance": 
          {
               return(
                            <div>suppBalance</div>
                       )  
           };  
           case "showSaldo": 
          {
               return(
                            <div>showSaldo</div>
                       )  
           };     
           case "addNewEmployee": 
          {
               return(
                            <div>addNewEmployee</div>
                       )  
           };  
           case "editEmployee": 
          {
               return(
                            <div>editEmployee</div>
                       )  
           };  
           case "showProducts": 
          {
               return(
                            <div>showProducts</div>
                       )  
           };  
           case "deleteEmployeer": 
          {
               return(
                            <div>deleteEmployeer</div>
                       )  
           };  
           case "showEmployees": 
          {
               return(
                            <div>showEmployees</div>
                       )  
           };  
          

        default : 
            return (
                <Container>
                  <h1>Welcome , {currectUser.Name} !!! </h1>
                      
       
       
                   
                </Container>

             ) };
    }
}

export default MainWindow;