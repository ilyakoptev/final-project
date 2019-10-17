import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal} from 'react-bootstrap';
import customerorders from '../data/customerorders';

export default class ShowCustomers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: [],
            getDataEmployees:[],
            selectedCustomer: {},
            getEmployee: {},
            redirectToHome: false,
            customerorders: customerorders,
            showModal: false,
            customerRowNum: null, 
        }

        //this.openCustomerDetails = this.openCustomerDetails.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.detailsModalWindow = this.detailsModalWindow.bind(this);
        
    }
    componentDidMount(){
        fetch('/getdataCustomers') // get promise
        .then(res => res.json())  //get json 
        .then(getData => this.setState({getData})); // get data from json and set on state
        fetch('/getdataEmployees')
        .then(res => res.json())
        .then(getDataEmployees => this.setState({getDataEmployees}));
        //console.log(this.state.getData)
      }
         
    openModal(e) {
        const index = e.target.getAttribute('data-key')
        this.setState({ showModal: true })
        this.setState({ customerRowNum:index })
      //  console.log( e.target.getAttribute('data-key'))
        console.log( this.state.getData[index-1].WorkName )
        this.setState({ selectedCustomer: this.state.getData[index-1] })
        const res = this.state.getDataEmployees.find( (item) => {if (item.EmployeeId == this.state.getData[index-1].EmployeeID) return item} ) //get all data of Employee that work with current customer
       //console.log( res.Name )
       this.setState({ getEmployee: res })
      
    }
    
    closeModal() {
        this.setState({ showModal: false })
    }
    detailsModalWindow() {
        const {selectedCustomer,getEmployee } = this.state;
        selectedCustomer.Agent = getEmployee.Name // add property employee name to customer modal 
        let detailsKeys = Object.keys(selectedCustomer) 
        let detailsValues = Object.values(selectedCustomer)
        let result =[]
        for(let i=0;i<detailsKeys.length;i++){
            result[i]=
                        <tr>
                            <td>{detailsKeys[i]}</td>
                            <td>{detailsValues[i]}</td>
                        </tr>
       }
       
      // console.log( result)
        // console.log(this.state.selectedCustomer)
       return result
     }
      render() {
        const { redirectToHome, getData , showModal, selectedCustomer} = this.state;
       
        if (redirectToHome) {
            return <Redirect to="/"/>
        }
        let count = 0 // row number in the table
        let customerRows = getData.map(cust =>   // generate table with customers
            <tr data-key={++count} onClick={this.openModal}> 
                 <td data-key={count}>{count}</td>
                                <td data-key={count}>{cust.CustID}</td>
                                <td data-key={count}>{cust.WorkName}</td>
                                <td data-key={count}>{cust.Company}</td>
                                <td data-key={count}>{cust.ContactName}</td>
                                <td data-key={count}>{cust.Email}</td>
                                <td data-key={count}>{cust.City}</td> 
                                
             </tr>)
      // console.log( this.state.getData[0].City )
      // console.log(selectedCustomer.City ) 
      //  console.log( Object.keys(selectedCustomer) ) 
        return(
              <Container> <h2> All Customers List</h2>
                        
                        <Table responsive="lg">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>CustID</th>
                                <th>WorkName</th>
                                <th>Company</th>
                                <th>ContactName</th>
                                <th>E-Mail</th>
                                <th>Location</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customerRows}
                            </tbody>
                        </Table>

                        <Modal show={showModal} onHide={this.closeModal} size="">  
                            <Modal.Header closeButton>
                                <Modal.Title>Customer Details - {selectedCustomer.WorkName}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Table responsive="sm" size="sm">
                                   <tbody>
                                   {this.detailsModalWindow()}
                                   </tbody>
                               </Table> 
                            </Modal.Body>
                
                        <Modal.Footer>
                          
                         <Button variant="danger" onClick={this.closeModal}>
                            Close
                         </Button>
                        </Modal.Footer>   
                </Modal>

            </Container>
          )
      }
    }