import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal, Row, Col, InputGroup, Form, FormControl, Spinner} from 'react-bootstrap';
import Loading from './Loading';

export default class ShowCustomerOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getCustomersOrders:[],
            selectedOrder: {},
            selectedOrderDetails:[],
            getCustomer: {},
            redirectToHome: false,
            showModal: false,
            filteredData:[],
            filterOrders: "",
            sortOrders: "",
            isLoading: "",
     }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.detailsModalWindow = this.detailsModalWindow.bind(this);
        this.getFilterText = this.getFilterText.bind(this);
        this.sortBy = this.sortBy.bind(this);
        
    }

    componentDidMount(){
        fetch('/getCustomersOrders')
        .then(res => res.json())
        .then(getCustomersOrders => this.setState({getCustomersOrders,isLoading:"d-none"}));
        
       // console.log("componentDidMount" + this.state.getCustomersOrders)
        this.viewstate()
    }
    viewstate(){
        console.log(this.state.getCustomersOrders)
    }
    
    getFilterText(e){
        this.setState({filterOrders:e.target.value})
       }
      sortBy(e){
        this.setState({sortOrders:e.target.value})
      }

    openModal(e) {
               
        const{getCustomersOrders} = this.state
       // const index = e.target.getAttribute('id')
        this.setState({ showModal: true })
        //console.log( e.target)
        //console.log( getData[index-1].WorkName )
        const order = getCustomersOrders.find((order)=>{if(order.CustOrderID == e.target.getAttribute('data-key')) return order})
        console.log( order )
        this.setState({ selectedOrder: order })
        this.setState({ selectedOrderDetails: order.OrderDetails })
    }
    
    closeModal() {
        this.setState({ showModal: false })
    }

    detailsModalHeader(){
        const {selectedOrder} = this.state;
        let header = <Modal.Header closeButton>
                         <Modal.Title >Order Details - {selectedOrder.CustOrderID}</Modal.Title> 
                    </Modal.Header>
        return   header
      }

    detailsModalWindow() {
       const {selectedOrderDetails } = this.state;
      
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
     
      resultArr = <tbody><tr>{header}</tr> {result} </tbody>  // build table for modal window 
      return resultArr
     }

     ordersTable(){
        const { getCustomersOrders , filterOrders, sortOrders} = this.state;
        const {activeUser} = this.props;
                
        let count = 0 // row number in the table
        let filter = filterOrders
        let sort = sortOrders
        let filteredData =[]
        for (let i=0;i<getCustomersOrders.length;i++) {
           let cust = getCustomersOrders[i].Customer // get full name in one string
           if (cust.toLowerCase().includes(filter.toLowerCase()) ){ // fullname and filter to lowCase to find all names 
               filteredData = filteredData.concat(getCustomersOrders[i])
               
            }        
        }
        if(sort==="Customer"){
            filteredData.sort((a, b) => (a.Customer > b.Customer) ? 1 : -1)
            filteredData.reverse()
         }
         if(sort==="CustOrderID"){
            filteredData.sort((a, b) => (a.CustOrderID > b.CustOrderID) ? 1 : -1)
            filteredData.reverse()
         }
             
       
       
        if (activeUser.Position == 2 || activeUser.Position == 4){   // if user sales manager or driver as can see only his orders
            filteredData = filteredData.filter(x => x.EmployeeID.includes(activeUser.EmployeeId));
            } //else  sortedArray = getCustomersOrders
    
        filteredData.reverse()
        count = 0 // row number in the table
        let orderRows = filteredData.map(order =>   // generate table with customers
            <tr data-key={++count} onClick={this.openModal}> 
                                <td data-key={order.CustOrderID}>{count}</td>
                                <td data-key={order.CustOrderID}>{order.CustOrderID}</td>
                                <td data-key={order.CustOrderID}>{order.Customer}</td>
                                <td data-key={order.CustOrderID}>{order.OrderIncomeDate}</td>
                                <td data-key={order.CustOrderID}>{order.OrderShippingDate}</td>
               </tr>)
        return orderRows
     }

      render() {
        const { redirectToHome, showModal, selectedOrder, isLoading} = this.state;
       
        if (redirectToHome) {
            return <Redirect to="/"/>
        } 
        if(isLoading == ""){
            return <Loading isLoading={isLoading} />
         }

        return(
              <Container> 

                    <Row className="justify-content-md-center">
                    <h2>  Customers Order List</h2>
                    </Row>
                    <Row>
                        <Col lg={12}>
                         <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                   <InputGroup.Text id="inputGroup-sizing-sm">Filter by:</InputGroup.Text>
                           </InputGroup.Prepend>
                           <FormControl onChange={this.getFilterText} aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Customer name "/>
                           <InputGroup.Prepend>
                                   <InputGroup.Text id="inputGroup-sizing-sm">Sort By:</InputGroup.Text>
                           </InputGroup.Prepend>
                           <Form.Control as="select" onChange={this.sortBy}>
                                    <option value="">Choose...</option>
                                    <option value="Customer">Customer</option>
                                    <option value="CustOrderID">Order ID</option>
                                   
                                    </Form.Control>
                         </InputGroup>
                        </Col>
                    </Row>   
                    
                    <Row className="justify-content-md-center" > 
                    <Col lg={12}>
                        <Table responsive="lg">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>OrderID</th>
                                <th>Customer</th>
                                <th>Order Date</th>
                                <th>Shipping Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.ordersTable()}
                            </tbody>
                        </Table>
                        </Col>
                      </Row>
                        <Modal show={showModal} onHide={this.closeModal} size="lg">  
                                {this.detailsModalHeader()}  
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