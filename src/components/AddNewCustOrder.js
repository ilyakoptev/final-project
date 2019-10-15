import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal, Form, Row, Col} from 'react-bootstrap';

export default class AddNewCustOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getDataCustomers: [],
            getDataProducts:[],
            getCustomersOrders: [],
            selectedCustomer: {},
            getEmployee: {},
            redirectToHome: false,
            showModal: false,
            selectedProducts: [], 
           
        }

        this.submitOrder = this.submitOrder.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.detailsModalWindow = this.detailsModalWindow.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.setCustomer = this.setCustomer.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
           
           
    }
    componentDidMount(){
        fetch('/getdataCustomers')
        .then(res => res.json())
        .then(getDataCustomers => this.setState({getDataCustomers}));
        fetch('/getdataProducts')
        .then(res => res.json())
        .then(getDataProducts => this.setState({getDataProducts}));
        fetch('/getCustomersOrders')
        .then(res => res.json())
        .then(getCustomersOrders => this.setState({getCustomersOrders}));
        //console.log(this.state.getData)
      }
         
    openModal(e) {
    //     const index = e.target.getAttribute('data-key')
          this.setState({ showModal: true })
    //     this.setState({ customerRowNum:index })
    //   //  console.log( e.target.getAttribute('data-key'))
    //     console.log( this.state.getData[index-1].WorkName )
    //     this.setState({ selectedCustomer: this.state.getData[index-1] })
    //     const res = this.state.getDataEmployees.find( (item) => {if (item.EmployeeId == this.state.getData[index-1].EmployeeID) return item} ) //get all data of Employee that work with current customer
    //    //console.log( res.Name )
    //    this.setState({ getEmployee: res })
      
    }
    
    closeModal() {
         this.setState({ showModal: false })
    }
    detailsModalWindow() {
           const {selectedCustomer,selectedProducts } = this.state;
   
    //     let detailsKeys = Object.keys(selectedCustomer) 
    //     let detailsValues = Object.values(selectedCustomer)
           let result =[]
            for(let i=0;i<selectedProducts.length;i++){
                result[i]=
                            <tr>
                                <td>{selectedProducts[i].id}</td>
                                <td>{selectedProducts[i].quantity}</td>
                            </tr>
        }
       
    //   // console.log( result)
    //     // console.log(this.state.selectedCustomer)
        return result
     }
     addProduct(e){
       let product = {}
       let productArr = this.state.selectedProducts
       product.id = e.target.id
       product.quantity = e.target.value
       productArr.push(product) 
       this.setState({selectedProducts:productArr})
     }
     setCustomer(e){
       let customer = e.target.value
       this.setState({selectedCustomer:customer})
     }
     submitOrder(){
       console.log(this.state.selectedProducts)
       console.log( this.state.selectedCustomer)
       this.openModal()
     }

     confirmOrder(){

     }
     
      render() {
        const { redirectToHome, getDataProducts, getDataCustomers , showModal, selectedCustomer} = this.state;
        if (redirectToHome) {
            return <Redirect to="/"/>
        }
        let count = 0 // row number in the table
        let Rows = getDataProducts.map(prod =>   // generate table with customers
            <tr data-key={++count} > 
                             <td data-key={count}>{count}</td>
                                <td data-key={count}>{prod.ProductID}</td>
                                <td data-key={count}>{prod.ProductName}</td>
                                <td data-key={count}>{prod.Description}</td>
                                <td data-key={count}>{prod.MinOrder + prod.Unit}</td>
                                <td data-key={count}>{prod.ListPrice}</td>
                                <td data-key={count}><Form.Control id={prod.ProductID} as="input" type="number" size="sm" placeholder="0" onBlur={this.addProduct} /></td>
                                {/* <td data-key={count}><Button size="sm">Add to Order</Button> </td>
                                <td data-key={count}><Button size="sm">Add to Order</Button> </td> */}
                                
             </tr>)
        count = 0 // row number in the table
        let customerRows = getDataCustomers.map(cust =>   // generate table with customers
            
                                <option key={++count} value={cust.CustID}>{count} , {cust.WorkName} , {cust.Company} , {cust.Email} </option>
            )
        return(
              <Container> <h2> Add New Customer Order:</h2>
                        <Form>
                        <Row>
                            <Col xs={10}>

                                    <Form.Label>  <h4> Choose Customer: </h4></Form.Label>
                                        <Form.Control as="select" onChange={this.setCustomer}>
                                        <option>Select Customer:</option>
                                        {customerRows}
                                     </Form.Control>
                            </Col>
                            <Col xs={2}>
                                    <Button variant="success" onClick={this.submitOrder}>
                                        <h5>Submit your order</h5>
                                    </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                  <Table responsive="lg" size="sm">
                                  <thead>
                                      <tr>
                                          <th>#</th>
                                          <th>ProductId</th>
                                          <th>ProductName</th>
                                          <th>Description</th>
                                          <th>MinOrder</th>
                                          <th>ListPrice</th>
                                          <th>Quantity</th>
                                          <th></th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      {Rows}
                                      </tbody>
                                  </Table>
                          </Col>
                        </Row>
                        </Form>
                        <Modal show={showModal} onHide={this.closeModal} size="">  
                            <Modal.Header closeButton>
                                <Modal.Title>Order for: {selectedCustomer}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Table responsive="sm" size="sm">
                                   <tbody>
                                     {this.detailsModalWindow()}
                                   </tbody>
                               </Table> 
                            </Modal.Body>
                
                        <Modal.Footer>
                        <Button variant="success" onClick={this.confirmOrder}>
                            Confirm
                         </Button>
                         <Button variant="danger" onClick={this.closeModal}>
                            Cancel
                         </Button>
                        </Modal.Footer>   
                </Modal>

            </Container>
          )
      }
    }