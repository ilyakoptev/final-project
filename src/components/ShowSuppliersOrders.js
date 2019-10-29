import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal} from 'react-bootstrap';
import Loading from './Loading';

export default class ShowSuppliersOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getDataCustomers: [],
            getCustomersOrders:[],
            getSuppliersOrders:[],
            selectedOrder: {},
            selectedOrderDetails:[],
            getCustomer: {},
            redirectToHome: false,
            showModal: false,
            isLoading: "",
          
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.detailsModalWindow = this.detailsModalWindow.bind(this);
        
    }
    componentDidMount(){
        // fetch('/getCustomersOrders')
        // .then(res => res.json())
        // .then(getCustomersOrders => this.setState({getCustomersOrders}));
        fetch('/getSuppliersOrders')
        .then(res => res.json())
        .then(getSuppliersOrders => this.setState({getSuppliersOrders,isLoading:"d-none"}));
       // console.log("componentDidMount" + this.state.getSuppliersOrders)
        this.viewstate()
    }
    viewstate(){
        console.log(this.state.getSuppliersOrders)
    }
          
    openModal(e) {
        const{getSuppliersOrders}=this.state
        const dataKey = e.target.getAttribute('data-key')
        this.setState({ showModal: true })
        let order = getSuppliersOrders.find((order)=>{ if(order.SuppOrderID===dataKey) return order })
        this.setState({ selectedOrder: order })
        this.setState({ selectedOrderDetails: order.OrderDetails })
        
    }
    
    closeModal() {
        this.setState({ showModal: false })
    }
    detailsModalWindow() {
       const {selectedOrder, selectedOrderDetails } = this.state;
      
       let obj = {}
     //   selectedOrder.Customer = getCustomer.WorkName // add property "Customer"  to order modal 
       let result =[]
       let resultArr 
       let header = " "
       let rowdata 
        for(let z=0;z<selectedOrderDetails.length;z++){  
            obj  = selectedOrderDetails[z]
           // console.log(obj)       
            let detailsKeys = Object.keys(obj) 
            let detailsValues = Object.values(obj)
            if(detailsKeys[0]=="_id"){
                detailsKeys.shift()
                detailsValues.shift()
            }
            
            //console.log(detailsKeys) 
            //console.log(detailsValues)      
                        
            if(z===0){   // make header for table in modal 
                header =  detailsKeys.map((key, index) => {
                    return <th key={index}>{key.toUpperCase()}</th>
            })}
             rowdata =  detailsValues.map((key, index) => {  // insert rows with data to table in modal 
                    return <td key={index}>{key}</td>
                    })
            result[z]= <tr>{rowdata}</tr>
            
          // resultArr.push(result)
        }
              
     //   obj  = selectedOrderDetails[0]
      //header = <tr>{header}</tr>
      //  console.log(header)       
      resultArr = <tbody><tr>{header}</tr> {result} </tbody>  // build table for modal window 
      return resultArr
     }
    
     render() {
       
        const {isLoading, redirectToHome, getSuppliersOrders , showModal, selectedOrder} = this.state;
        
        if (redirectToHome) {
            return <Redirect to="/"/>
        }
        if(isLoading == ""){
            return <Loading isLoading={isLoading} />
         }
        let sortedArray = getSuppliersOrders.slice();
       
        sortedArray.reverse()
        let count = 0 // row number in the table
        let Rows = sortedArray.map(order =>   // generate table with customers
            <tr data-key={++count} onClick={this.openModal}> 
                                <td data-key={order.SuppOrderID}>{count}</td>
                                <td data-key={order.SuppOrderID}>{order.SuppOrderID}</td>
                                <td data-key={order.SuppOrderID}>{order.SuppName}</td>
                                <td data-key={order.SuppOrderID}>{order.CustomerOrderID}</td>
                                <td data-key={order.SuppOrderID}>{order.OrderDate}</td>
                                <td data-key={order.SuppOrderID}>{order.ShippingDate}</td>
                                
                               
                                
             </tr>)
  
        return(
              <Container> <h2>  Suppliers Order List</h2>
                        
                        <Table responsive="lg">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Supplier OrderID</th>
                                <th>Supplier</th>
                                <th>Customer OrderID</th>
                                <th>Order Date</th>
                                <th>Shipping Date</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {Rows}
                            </tbody>
                        </Table>

                        <Modal show={showModal} onHide={this.closeModal} size="lg">  
                            <Modal.Header  closeButton>
                                <Modal.Title  >Order Details - {selectedOrder.SuppOrderID}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="mx-auto">
                            <Table  responsive="sm" size="sm">
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