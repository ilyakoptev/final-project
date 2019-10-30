import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal, Form, Row, Col, Image, } from 'react-bootstrap';
import Loading from './Loading';

export default class AddNewCustOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getDataCustomers: [], // all customers data 
            getDataProducts:[], // all products data
            getCustomersOrders: [], // all customers orders data
            selectedCustomer: {},  // selected customer for current order 
            getEmployee: {},
            redirectToHome: false,
            showModal: false,
            selectedProducts: [], 
            selectedProduct: null,
            isDisabled: true,  // button Submit order status 
            isLoading: "",
            ifProductSelected: false, 
            ifCustomerSelected: false,
            submitOrderArray:[],
            getQuantity:[],
            isSuccess:false  // show success message in success adding new order
               
           
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
        this.reset = this.reset.bind(this); 
             
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
        .then(getCustomersOrders => this.setState({getCustomersOrders,isLoading:"d-none"}));
        //console.log(this.state.getData)
      }
      
    openModal(e) {
        this.setState({ showModal: true })
    }
    closeModal() {
         this.setState({ showModal: false })
    }


    detailsModalWindow() {
           const {submitOrderArray,getDataProducts} = this.state;
           let result = []
           if (submitOrderArray.length===0){
               result[0] = <tr><td>No items selected</td></tr>
           }
           else{
            for(let i=0;i<submitOrderArray.length;i++){
              let item = getDataProducts.find((item=>{if(item.ProductID==submitOrderArray[i].id) return item}))
              result[i]=
                            <tr>
                                <td>{submitOrderArray[i].id}</td>
                                <td>{item.ProductName}</td>
                                <td>{item.Description}</td>
                                <td>{submitOrderArray[i].quantity}</td>
                                
                            </tr>
           }
          }
    //   // console.log( result)
    //     // console.log(this.state.selectedCustomer)
        return result
     }


     insertProdQuantity(e){ // read input 
        const {selectedProducts, getQuantity} = this.state
        let productArr = getQuantity
        if(e.target.value == 0 || e.target.value == "" || e.target.value == undefined ){
             return
        }
        // if(e.target.value.lenght > 0)
        //     this.setState({ifProductSelected:true})  // set property of selected product true
        // else 
        //     this.setState({ifProductSelected:false})  // set property of selected product false if field is empty 
        let product = {}
       // let productArr = []
        product.id = e.target.id
        product.quantity = e.target.value
        productArr.unshift(product) //insert in the first place 
        this.setState({getQuantity:productArr})
        console.log("insertProdQuantity" )
        console.log(e.target.id, e.target.value, e.target.value.length )
        console.log(selectedProducts)
     }
    
     setQuantity(){  // get input  from input field and put it into temporary array and get a last value = final input
        const {selectedProducts,getQuantity,ifCustomerSelected} = this.state
        let temp =  [] 
        temp = selectedProducts
        temp.unshift(getQuantity[0]) 
        this.setState({selectedProducts:temp})
        this.setState({ifProductSelected:true})  // set property of selected product true
        if(ifCustomerSelected) 
             this.setState({isDisabled:false})   // set visible to  submit button 
        else 
             this.setState({isDisabled:true})  
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
              submitOrder = submitOrder.concat(submitProduct)    
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
        else
             this.setState({isDisabled:true})   // open submit button 
            // console.log(e.target.getAttribute('data-key'))
      this.setState({submitOrderArray:submitOrder})
      console.log("submitOrderArray")
      console.log(submitProduct)
      console.log(submitOrder)
     }
   
     setCustomer(e){   // set state for customer for new order 
       const {ifProductSelected, getDataCustomers} = this.state
       //let customer = e.target.value  
       let customer = getDataCustomers.find((cust) => {if(cust.CustID == e.target.value) return cust})
       this.setState({selectedCustomer:customer})
       this.setState({ifCustomerSelected:true})  
       if(ifProductSelected) 
          this.setState({isDisabled:false})   // set visible to  submit button 
     }
     reset(){ // by clicking reset button 
        this.setState({isDisabled:true})
        this.setState({ifCustomerSelected:false})  
        this.setState({ifProductSelected:false})  
     }

     submitOrder(){  // open modal with final order  
       console.log(this.state.submitOrderArray)
       console.log(this.state.selectedCustomer)
     this.openModal()
     }

     confirmOrder(){ // save it to array with all customer orders 
       // this.setState({redirectToHome:true})
       const {selectedCustomer, getCustomersOrders,submitOrderArray,getDataProducts} = this.state
       var date = new Date();
       var currentDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
       var shipDate = new Date();
       var numberOfDaysToAdd = 10;
       shipDate.setDate(shipDate.getDate() + numberOfDaysToAdd); 
       var customerOrder = {} // greate a new order to add to data base
       let id = (parseInt(getCustomersOrders[getCustomersOrders.length-1].CustOrderID) + 1 ).toString()
       customerOrder._id = id
       customerOrder.CustOrderID = id
       customerOrder.CustomerID = selectedCustomer.CustID // customer ID 
       customerOrder.OrderIncomeDate = currentDate
       customerOrder.OrderShippingDate = shipDate.getFullYear() + "-" + (shipDate.getMonth()+1) + "-" + shipDate.getDate()
       customerOrder.Customer = selectedCustomer.WorkName
       customerOrder.EmployeeID  = this.props.activeUser.EmployeeId // number of agent 
       var orderDetailsArray = [] // greate a new order to add to data base
       for(let i=0;i<submitOrderArray.length;i++){
             let orderDetails={}
             orderDetails.ProductId = submitOrderArray[i].id
             orderDetails.Qty = submitOrderArray[i].quantity
             orderDetails.UnitPrice = getDataProducts.find((prod) => {if(orderDetails.ProductId==prod.ProductID) return prod}).ListPrice
             orderDetails.Discount = "0.00"
             orderDetailsArray = orderDetailsArray.concat(orderDetails)

       } 
       customerOrder.OrderDetails = orderDetailsArray
       console.log(customerOrder)
       console.log(orderDetailsArray)

       fetch('/insertCustomerOrder',{ // send data to express server 
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(customerOrder), //customerOrder
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                })
                .then((res) => {
                    if (res.ok){
                      return res.json();
                    } else {
                      throw new Error ('Something went wrong with your fetch');
                    }
                  }).then((json) => {
                    console.log(json);
                    this.setState({isSuccess:true})
                  })
        this.closeModal()  
        this.setState({redirectToHome:true})    // redirect to mainwindow   
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
        const {isLoading, redirectToHome, getDataProducts, getDataCustomers , showModal, selectedCustomer, isDisabled, submitOrderArray,isSuccess} = this.state;
        
        if (isSuccess) {
            return <Container>
                     <Row>
                         <Col> <h2 className="text-success text-center">Your order was added successfully</h2> </Col>
                     </Row>
                  </Container>
        }
        if (redirectToHome) {
            return <Redirect to="/dashboard"/>
        }
        if(isLoading == ""){
          return <Loading isLoading={isLoading} />
       }
        


        let count = 0 // row number in the table
        let Rows = getDataProducts.map(prod =>   // generate table with customers
           
            <tr data-key={++count} > 
                                <td data-key={count}>{count}</td>
                                <td data-key={count}>{prod.ProductID}</td>
                                <td data-key={count}>{prod.ProductName}</td>
                                <td data-key={count}>{prod.Description}</td>
                                <td data-key={count}>{prod.MinOrder + prod.Unit}</td>
                                <td data-key={count}>{prod.ListPrice}
                                    {/* <Form.Control   data-key={prod.ProductID} as="input" type="text" size="sm" placeholder={prod.ListPrice} onBlur={this.insertProdQuantity}/>      */}
                                  </td>
                                <td data-key={count} >
                                    <Form.Control   id={prod.ProductID} as="input" type="number" size="sm"  placeholder="0" onChange={this.insertProdQuantity}
                                      onBlur={this.setQuantity} />
                                 
                                {/* <span>{submitOrderArray.find((item) => {if(item.id===prod.ProductID) return item.quantity})}</span> */}
                                 </td>
                                 <td><Button size="sm" data-key={prod.ProductID} onClick={this.addProduct}>Add to Order</Button> </td>
                    </tr>)
             
        count = 0 // row number in the table
        let customerRows = getDataCustomers.map(cust =>   // generate list with customers
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
                                        <option selected disabled>Select Customer:</option>
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
                                    <Button className="my-3 btn-block" variant="danger" type="reset" onClick={this.reset}>
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
                                <Modal.Title>Order for: {selectedCustomer.WorkName}</Modal.Title>
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
                            Cancel
                         </Button>
                         <Button variant="success" onClick={this.confirmOrder}>
                            Confirm
                         </Button>
                        </Modal.Footer>   
                </Modal>

            </Container>
          )
      }
    }