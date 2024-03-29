/* eslint-disable eqeqeq */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap';
import ShowCustomers from '../components/ShowCustomers';
import ShowSuppliers from './ShowSuppliers';
import ShowProducts from './ShowProducts';
import ShowCustomerOrders from './ShowCustomerOrders';
import AddNewCustOrder from './AddNewCustOrder';
import AddNewCustomer from './AddNewCustomer';
import ShowSuppliersOrders from './ShowSuppliersOrders';
import AddNewSuppOrder from './AddNewSuppOrder';
import EditCustomer from './EditCustomer';
import AddNewSupplier from './AddNewSupplier';
import ShowEmployees from './ShowEmployees';
import EditSupplier from './EditSupplier';


class MainWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: [],
            redirectToHome: false,
           
        }

        //this.logout = this.logout.bind(this);
    }
 
    render() {
        const { activeUser,  menuChoose } = this.props;
        const { redirectToHome } = this.state;
        const currectUser = activeUser //  //get all data of currect user 
        if (redirectToHome) {
            return <Redirect to="/"/>
        }
       
       //conditional rendering by menu item clicked
       switch(menuChoose) {
        case "createNewCustOrder": 
              return(                        <AddNewCustOrder activeUser={activeUser}/> )  
        case "showAllCustomerOrders": 
               return(                       <ShowCustomerOrders activeUser={activeUser}/>                                  )                         
        case "addNewCustomer": 
              return(                        <AddNewCustomer activeUser={activeUser}/>                                 )  
        case "editCustomer": 
              return(                            <EditCustomer activeUser={activeUser}/>                           )  
        case "showCustomers": 
              return(                         <ShowCustomers activeUser={activeUser}/>                        )  
        case "createNewSuppOrder": 
                return(                       <AddNewSuppOrder activeUser={activeUser}/>                         )  
        case "showAllSuppOrders": 
                return(                       <ShowSuppliersOrders activeUser={activeUser}/>                         ) 
        case "addNewSupplier": 
                return(                       <AddNewSupplier activeUser={activeUser}/>                         ) 
        case "editSupplier": 
                 return(                           <EditSupplier activeUser={activeUser}/>                    )  
        case "showSuppliers": 
                 return(                     <ShowSuppliers activeUser={activeUser}/>                       )  
        case "addNewProduct": 
                 return(                            <div>addNewProduct</div>                        )  
        case "editProduct": 
                 return(                             <div>editProduct</div>                       )  
        case "deleteProduct": 
                 return(                             <div>deleteProduct</div>                          )  
        case "showProducts": 
                 return(                      <ShowProducts activeUser={activeUser}/>                       )  
        case "newReciept": 
               return(                            <div>newReciept</div>                       )  
        case "newPayment": 
               return(                         <div>newPayment</div>                    )  
        case "custBalance": 
             return(                         <div>custBalance</div>                    )  
        case "customerDocuments": 
             return(                         <div>customerDocuments</div>                    )  
        case "suppBalance": 
              return(                         <div>suppBalance</div>                    )  
        case "supplierDocuments": 
              return(                         <div>supplierDocuments</div>                    ) 
        case "showSaldo": 
             return(                            <div>showSaldo</div>                    )  
        case "addNewEmployee":    
             return(                            <div>addNewEmployee</div>                    )  
        case "editEmployee":    
             return(                            <div>editEmployee</div>                    )  
        case "deleteEmployeer": 
                return(                         <div>deleteEmployeer</div>                    )  
        case "showEmployees": 
               return(                         <ShowEmployees activeUser={activeUser}/>                    )  
        // case null:
        //         return (
        //             <Container>
        //               <h1>Success !!! </h1>
        //             </Container>
        //            ) 
         default : 
            return (
                <Container>
                  <h1>Welcome , {currectUser.Name} !!! </h1>
                </Container>

             ) };
    }
}

export default MainWindow;