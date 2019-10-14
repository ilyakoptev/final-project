import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal} from 'react-bootstrap';
//import customerorders from '../data/customerorders';

export default class ShowCustomerOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: [],
            getDataCustOrders:[],
            selectedOrder: {},
            getOrder: {},
            redirectToHome: false,
            showModal: false,
          
        }

        //this.openCustomerDetails = this.openCustomerDetails.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.detailsModalWindow = this.detailsModalWindow.bind(this);
        
    }
    componentDidMount(){
        // fetch('/getdata')
        // .then(res => res.json())
        // .then(getData => this.setState({getData}));
        fetch('/getCustomersOrders')
        .then(res => res.json())
        .then(getDataCustOrders => this.setState({getDataCustOrders}));
        console.log(this.state.getDataCustOrders)
        
      }
         
    openModal(e) {
        const index = e.target.getAttribute('data-key')
        this.setState({ showModal: true })
        
      //  console.log( e.target.getAttribute('data-key'))
     //   console.log( this.state.getDataCustOrders[index-1].SuppId )
        this.setState({ selectedOrder: this.state.getDataCustOrders[index-1] })
        //const res = this.state.getDataCustOrders.find( (item) => {if (item.SuppId == this.state.getDataCustOrders[index-1].CategoryID) return item} ) //get all data of Employee that work with current customer
       //console.log( res.Name )
     //  this.setState({ getOrder: res })
      
    }
    
    closeModal() {
        this.setState({ showModal: false })
    }
    detailsModalWindow() {
       const {selectedOrder,getOrder } = this.state;
     //   selectedOrder.Agent = getOrder.Name // add property employee name to customer modal 
        let detailsKeys = Object.keys(selectedOrder) 
        let detailsValues = Object.values(selectedOrder)
        let result =[]
        for(let i=0;i<detailsKeys.length;i++){
            result[i]=
                        <tr>
                            <td>{detailsKeys[i]}</td>
                            <td>{detailsValues[i]}</td>
                        </tr>
       }
       
      
         console.log(this.state.selectedOrder)
       return result
     }
      render() {
        const { redirectToHome, getDataCustOrders , showModal, selectedOrder} = this.state;
        console.log(getDataCustOrders) 
        if (redirectToHome) {
            return <Redirect to="/"/>
        }
        let count = 0 // row number in the table
        let Rows = getDataCustOrders.map(order =>   // generate table with customers
            <tr data-key={++count} onClick={this.openModal}> 
                 <td data-key={count}>{count}</td>
                                <td data-key={count}>{order.CustOrderID}</td>
                                <td data-key={count}>{order.CustomerID}</td>
                                <td data-key={count}>{order.OrderIncomeDate}</td>
                                <td data-key={count}>{order.OrderShippingDate}</td>
                                
                               
                                
             </tr>)
      // console.log( this.state.getData[0].City )
      // console.log(selectedOrder.City ) 
      //  console.log( Object.keys(selectedOrder) ) 
        return(
              <Container> <h2> All Supplier List</h2>
                        
                        <Table responsive="lg">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>OrderID</th>
                                <th>CustomerID</th>
                                <th>Order Date</th>
                                <th>Shipping Date</th>
                               
                                
                            </tr>
                            </thead>
                            <tbody>
                            {Rows}
                            </tbody>
                        </Table>

                        <Modal show={showModal} onHide={this.closeModal} size="">  
                            <Modal.Header closeButton>
                                <Modal.Title>Order Details - {selectedOrder.CustOrderID}</Modal.Title>
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