import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal} from 'react-bootstrap';
//import customerorders from '../data/customerorders';

export default class ShowCustomerOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getDataCustomers: [],
            getDataCustOrders:[],
            selectedOrder: {},
            selectedOrderDetails:[],
            getCustomer: {},
            redirectToHome: false,
            showModal: false,
          
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.detailsModalWindow = this.detailsModalWindow.bind(this);
        
    }
    componentDidMount(){
        // fetch('/getdataCustomers')
        // .then(res => res.json())
        // .then(getDataCustomers => this.setState({getDataCustomers}));
        fetch('/getCustomersOrders')
        .then(res => res.json())
        .then(getDataCustOrders => this.setState({getDataCustOrders}));
       // console.log("componentDidMount" + this.state.getDataCustOrders)
        this.viewstate()
    }
    viewstate(){
        console.log(this.state.getDataCustOrders)
    }
          
    openModal(e) {
        const index = e.target.getAttribute('data-key')
        this.setState({ showModal: true })
        this.setState({ selectedOrder: this.state.getDataCustOrders[index-1] })
        this.setState({ selectedOrderDetails: this.state.getDataCustOrders[index-1].OrderDetails })
        
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
            console.log(obj)       
            let detailsKeys = Object.keys(obj) 
            let detailsValues = Object.values(obj)
            
            console.log(detailsKeys) 
            console.log(detailsValues)      
                        
            if(z===0){   // make header for table in modal 
                header =  detailsKeys.map((key, index) => {
                    return <th key={index}>{key.toUpperCase()}</th>
            })}
            
            rowdata =  detailsValues.map((key, index) => {  // insert rows with data to table in modal 
                    return <th key={index}>{key}</th>
                
                })
            result[z]= <tr>{rowdata}</tr>
            
          // resultArr.push(result)
        }
              
     //   obj  = selectedOrderDetails[0]
      //header = <tr>{header}</tr>
      //  console.log(header)       
      resultArr = <tbody><tr>{header}</tr> {result} </tbody>
      return resultArr
     }
      render() {
        const { redirectToHome, getDataCustOrders , showModal, selectedOrder} = this.state;
        const {activeUser} = this.props;
       // console.log(getDataCustOrders) 
       if (activeUser == 2 && activeUser == 4){   // if user sales manager or driver as can see only his orders
            var sortedArray = this.state.getDataCustOrders.filter(x => x.EmployeeID.includes(activeUser));
            console.log("this.props.activeUser.ImployeeId" + activeUser)
            console.log(sortedArray)
       } else  sortedArray = getDataCustOrders
    
        if (redirectToHome) {
            return <Redirect to="/"/>
        }

        let count = 0 // row number in the table
        let Rows = sortedArray.map(order =>   // generate table with customers
            <tr data-key={++count} onClick={this.openModal}> 
                 <td data-key={count}>{count}</td>
                                <td data-key={count}>{order.CustOrderID}</td>
                                <td data-key={count}>{order.Customer}</td>
                                <td data-key={count}>{order.OrderIncomeDate}</td>
                                <td data-key={count}>{order.OrderShippingDate}</td>
                                <td data-key={count}>{order.OrderShippingDate}</td>
                               
                                
             </tr>)
      // console.log( this.state.getData[0].City )
      // console.log(selectedOrder.City ) 
      //  console.log( Object.keys(selectedOrder) ) 
        return(
              <Container> <h2>  Customers Order List</h2>
                        
                        <Table responsive="lg">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>OrderID</th>
                                <th>Customer</th>
                                <th>Order Date</th>
                                <th>Shipping Date</th>
                                <th></th>
                                
                            </tr>
                            </thead>
                            <tbody>
                            {Rows}
                            </tbody>
                        </Table>

                        <Modal show={showModal} onHide={this.closeModal} size="lg">  
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