import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal} from 'react-bootstrap';
import customerorders from '../data/customerorders';

export default class ShowSuppliers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: [],
            getDataSuppliers:[],
            selectedSupplier: {},
            getSupplier: {},
            redirectToHome: false,
            showModal: false,
          
        }

        //this.openCustomerDetails = this.openCustomerDetails.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.supplierModalWindow = this.supplierModalWindow.bind(this);
        
    }
    componentDidMount(){
        // fetch('/getdata')
        // .then(res => res.json())
        // .then(getData => this.setState({getData}));
        fetch('/getdataSuppliers')
        .then(res => res.json())
        .then(getDataSuppliers => this.setState({getDataSuppliers}));
        //console.log(this.state.getData)
      }
         
    openModal(e) {
        const index = e.target.getAttribute('data-key')
        this.setState({ showModal: true })
        
      //  console.log( e.target.getAttribute('data-key'))
        console.log( this.state.getData[index-1].WorkName )
        this.setState({ selectedSupplier: this.state.getData[index-1] })
        //const res = this.state.getDataSuppliers.find( (item) => {if (item.SuppId == this.state.getData[index-1].CategoryID) return item} ) //get all data of Employee that work with current customer
       //console.log( res.Name )
     //  this.setState({ getSupplier: res })
      
    }
    
    closeModal() {
        this.setState({ showModal: false })
    }
    supplierModalWindow() {
        const {selectedSupplier,getSupplier } = this.state;
        selectedSupplier.Agent = getSupplier.Name // add property employee name to customer modal 
        let detailsKeys = Object.keys(selectedSupplier) 
        let detailsValues = Object.values(selectedSupplier)
        let result =[]
        for(let i=0;i<detailsKeys.length;i++){
            result[i]=
                        <tr>
                            <td>{detailsKeys[i]}</td>
                            <td>{detailsValues[i]}</td>
                        </tr>
       }
       
       console.log( getSupplier.Name )
        // console.log(this.state.selectedSupplier)
       return result
     }
      render() {
        const { redirectToHome, getData , showModal, selectedSupplier} = this.state;
       
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
      // console.log(selectedSupplier.City ) 
      //  console.log( Object.keys(selectedSupplier) ) 
        return(
              <Container> <h2> All Supp;ier List</h2>
                        
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
                                <Modal.Title>Supplier Details - {selectedSupplier.WorkName}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Table responsive="sm" size="sm">
                                   <tbody>
                                   {this.supplierModalWindow()}
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