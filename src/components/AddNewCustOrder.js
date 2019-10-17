import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal, Form, Row, Col, Image} from 'react-bootstrap';

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
            selectedProduct: null,
            isDisabled: true,  // button Submit order status 
            ifProductSelected: false, 
            ifCustomerSelected: false,
            tdBackground:"",
            submitOrderArray:[],
            getQuantity:[]
            
           
           
        }

        this.submitOrder = this.submitOrder.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.detailsModalWindow = this.detailsModalWindow.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.setCustomer = this.setCustomer.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.insertProdQuantity = this.insertProdQuantity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setQuantity = this.setQuantity.bind(this);
        
        
        
           
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


     insertProdQuantity(e){ // read input 
        const {selectedProducts,selectedProductQuantity, ifCustomerSelected, ifProductSelected} = this.state
        if(e.target.value == 0){
           return
        }
        this.setState({ifProductSelected:true})  // set property of selected product true
        this.setState({addProductButtonIsDisable:true})
        let product = {}
        let productArr = []
        product.id = e.target.id
        product.quantity = e.target.value
        productArr.unshift(product) 
        this.setState({getQuantity:productArr})
        console.log("insertProdQuantity" )
        console.log(e.target.id, e.target.value )
        console.log(selectedProducts)
     }
     setQuantity(){  // get input  from input field and put it into temporary array and get a last value = final input
        const {selectedProducts,getQuantity} = this.state
        let temp =  [] 
        temp = selectedProducts
        temp.unshift(getQuantity[0]) 
        this.setState({selectedProducts:temp})
        console.log("setQuantity")
        console.log(temp)
     } 
     addProduct(e){ // add products to state array
       const {selectedProducts,submitOrderArray, ifCustomerSelected, ifProductSelected} = this.state
       let id = e.target.getAttribute('data-key') // button id = productID 
       let submitOrder = submitOrderArray // 
       let submitProduct = selectedProducts.find((prod) => {if(prod.id==id) return prod}) // get last inserting of quantity
       var flag = false
       console.log("before the insert:")
       console.log(selectedProducts)
       console.log(submitProduct)
       console.log(submitOrder)
        if(submitProduct!==undefined){
                   // insert to product array
            if(submitOrder.length===0){
                 submitOrder.push(submitProduct)    
                 console.log("if lenght = 0 ")
                 console.log(submitProduct)
                 console.log(submitOrder)}
            else 
           {
            for(let i=0;i<submitOrder.length;i++){
                console.log(i)
                if (submitOrder[i].id === submitProduct.id){
                    console.log("inside if ")
                    console.log(submitOrder[i].id, submitOrder[i].quantity , submitProduct.id, submitProduct.quantity )
                     submitOrder[i].quantity = submitProduct.quantity
                     flag = true
                     console.log(submitProduct)
                     console.log(submitOrder)
                     break
                }
                
            }
            if(!flag) { submitOrder.push(submitProduct)   
                console.log("inside of else")
                console.log(submitProduct)
                console.log(submitOrder) 
                   }
           }
       }
            
       if(ifCustomerSelected&&ifProductSelected) // check of customer selected 
            this.setState({isDisabled:false})   // open submit button 
      // console.log(e.target.getAttribute('data-key'))
      this.setState({submitOrderArray:submitOrder})
      console.log("submitOrderArray")
      console.log(submitProduct)
      console.log(submitOrder)
     }
   
     setCustomer(e){   // set state for customer for new order 
       const {ifProductSelected} = this.state
       let customer = e.target.value
       this.setState({selectedCustomer:customer})
       this.setState({ifCustomerSelected:true})  
       if(ifProductSelected) 
          this.setState({isDisabled:false})   // set visible to  submit button 
     }
     
     submitOrder(){  // open modal with final order and save it to array with all customer orders
       console.log(this.state.submitOrderArray)
       console.log( this.state.selectedCustomer)
       this.openModal()
     }

     confirmOrder(){
        this.setState({redirectToHome:true})
     }
     handleSubmit(event) {
        //alert(event.target.length)
       
        for(let i=0 ; i <event.target.length ; i++){
            console.log("Index i:" + i + " Name:" + event.target[i].name +  " Key:" + event.target[i].getAttribute('data-key') + " Value:" + event.target[i].value + " Id:" + event.target[i].id );
        }
        //console.log(event);
        event.preventDefault();
      }   
    
      render() {
        const { redirectToHome, getDataProducts, getDataCustomers , showModal, selectedCustomer, isDisabled, submitOrderArray} = this.state;
        if (redirectToHome) {
            return <Redirect to="/dashboard"/>
        }
        let count = 0 // row number in the table
        let Rows = getDataProducts.map(prod =>   // generate table with customers
           
            <tr data-key={++count} > 
                             <td data-key={count}>{count}</td>
                                <td data-key={count}>{prod.ProductID}</td>
                                <td data-key={count}>{prod.ProductName}</td>
                                <td data-key={count}>{prod.Description}</td>
                                <td data-key={count}>{prod.MinOrder + prod.Unit}</td>
                                <td data-key={count}>
                                    <Form.Control   data-key={prod.ProductID} as="input" type="text" size="sm" placeholder={prod.ListPrice} onBlur={this.insertProdQuantity}/>     
                                  </td>
                                <td data-key={count} >
                                    <Form.Control   id={prod.ProductID} as="input" type="number" size="sm"  placeholder="0" onChange={this.insertProdQuantity}
                                      onBlur={this.setQuantity} />
                                 
                                {/* <span>{submitOrderArray.find((item) => {if(item.id===prod.ProductID) return item.quantity})}</span> */}
                                 </td>
                                 <td><Button size="sm" data-key={prod.ProductID} onClick={this.addProduct}>Add to Order</Button> </td>
                                 
                                
              </tr>)
             
        count = 0 // row number in the table
        let customerRows = getDataCustomers.map(cust =>   // generate table with customers
            
                                <option value={cust.CustID}>{++count} - {cust.WorkName} , {cust.Company} , {cust.Email} </option>
            )
        return(
              <Container> <h3 class="text-center"> Add New Customer Order:</h3>
                     <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col xs={4} lg={2}>
                            <Form.Label>  <h5> Choose Customer: </h5></Form.Label>
                            </Col>
                            <Col xs={6} lg={8}>
                                     <Form.Control as="select" onChange={this.setCustomer} >
                                        <option>Select Customer:</option>
                                        {customerRows}
                                     </Form.Control>
                            </Col>
                            <Col xs={2} lg={2}>
                                <div  className="position-relative cart mx-auto text-center" >
                                    <Image src="images/cart.jpg" />
                                    <span class="counter position-absolute" ><h3 class="red ">{submitOrderArray.length}</h3></span>
                                    </div>
                                     
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
                        <Row>
                        <Col xs={6} >        
                                    <Button className="my-3 btn-block" variant="danger" type="submit">
                                        <h5>Reset all fields</h5>
                                    </Button>
                            </Col>
                          <Col xs={6} ml="auto">
                                    <Button className="my-3 btn-block"  variant="success" disabled={isDisabled} onClick={this.submitOrder}>
                                        <h5>Submit your order</h5>
                                    </Button>
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