import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal, Row, Col, InputGroup, Form, FormControl} from 'react-bootstrap';
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
            filteredData:[],
            filterOrders: "",
            sortOrders: "",
          
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.detailsModalWindow = this.detailsModalWindow.bind(this);
        this.getFilterText = this.getFilterText.bind(this);
        this.sortBy = this.sortBy.bind(this);
        
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
    
    getFilterText(e){
        this.setState({filterOrders:e.target.value})
       }
      sortBy(e){
        this.setState({sortOrders:e.target.value})
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
   
    detailsModalHeader(){
        const {selectedOrder} = this.state;
        let header = <Modal.Header closeButton>
                         <Modal.Title >Order Details - {selectedOrder.SuppOrderID}</Modal.Title> 
                    </Modal.Header>
        return   header
      }


    detailsModalWindow() {
       const { selectedOrderDetails } = this.state;
      
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
          if(z===0){   // make header for table in modal 
                header =  detailsKeys.map((key, index) => {
                    return <th key={index}>{key.toUpperCase()}</th>
            })}
             rowdata =  detailsValues.map((key, index) => {  // insert rows with data to table in modal 
                    return <td key={index}>{key}</td>
                    })
            result[z]= <tr>{rowdata}</tr>
         }
           resultArr = <tbody><tr>{header}</tr> {result} </tbody>  // build table for modal window 
      return resultArr
     }
     
     ordersTable(){
        const { getSuppliersOrders , filterOrders, sortOrders} = this.state;
        const {activeUser} = this.props;
                
        let count = 0 // row number in the table
        let filter = filterOrders
        let sort = sortOrders
        let filteredData =[]
        for (let i=0;i<getSuppliersOrders.length;i++) {
           let cust = getSuppliersOrders[i].SuppName+getSuppliersOrders[i].CustomerOrderID+getSuppliersOrders[i].SuppOrderID // get full name in one string
           if (cust.toLowerCase().includes(filter.toLowerCase()) ){ // fullname and filter to lowCase to find all names 
               filteredData = filteredData.concat(getSuppliersOrders[i])
              }        
        }
        if(sort==="SuppName"){
            filteredData.sort((a, b) => (a.SuppName > b.SuppName) ? 1 : -1)
            filteredData.reverse()
         }
         if(sort==="CustOrderID"){
            filteredData.sort((a, b) => (a.CustomerOrderID > b.CustomerOrderID) ? 1 : -1)
            filteredData.reverse()
         }
         if(sort==="SuppOrderID"){
            filteredData.sort((a, b) => (a.SuppOrderID > b.SuppOrderID) ? 1 : -1)
            filteredData.reverse()
         }
             
       
       
        if (activeUser.Position == 2 || activeUser.Position == 4){   // if user sales manager or driver as can see only his orders
            filteredData = filteredData.filter(x => x.EmployeeID.includes(activeUser.EmployeeId));
            } //else  sortedArray = getCustomersOrders
    
        filteredData.reverse()
        count = 0 // row number in the table
        let orderRows = filteredData.map(order =>   // generate table with customers
            <tr data-key={++count} onClick={this.openModal}> 
                        <td data-key={order.SuppOrderID}>{count}</td>
                        <td data-key={order.SuppOrderID}>{order.SuppOrderID}</td>
                        <td data-key={order.SuppOrderID}>{order.SuppName}</td>
                        <td data-key={order.SuppOrderID}>{order.CustomerOrderID}</td>
                        <td data-key={order.SuppOrderID}>{order.OrderDate}</td>
                        <td data-key={order.SuppOrderID}>{order.ShippingDate}</td>
            </tr>)

        return orderRows
     }


     render() {
       
        const {isLoading, redirectToHome, showModal } = this.state;
        
        if (redirectToHome) {
            return <Redirect to="/"/>
        }
        if(isLoading == ""){
            return <Loading isLoading={isLoading} />
         }
        
        return(
              <Container> 
                    <Row className="justify-content-md-center">
                    <h2>  Suppliers Order List</h2>
                    </Row>
                    <Row>
                        <Col lg={12}>
                         <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                   <InputGroup.Text id="inputGroup-sizing-sm">Filter by:</InputGroup.Text>
                           </InputGroup.Prepend>
                           <FormControl onChange={this.getFilterText} aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
                               placeholder="Supplier Name / Supp orderID / Cust orderID "/>
                           <InputGroup.Prepend>
                                   <InputGroup.Text id="inputGroup-sizing-sm">Sort By:</InputGroup.Text>
                           </InputGroup.Prepend>
                           <Form.Control as="select" onChange={this.sortBy}>
                                    <option value="">Choose...</option>
                                    <option value="SuppName">Supplier</option>
                                    <option value="SuppOrderID">Supplier OrderID</option>
                                    <option value="CustomerOrderID">Customer OrderID</option>
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
                                <th>Supplier OrderID</th>
                                <th>Supplier</th>
                                <th>Customer OrderID</th>
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