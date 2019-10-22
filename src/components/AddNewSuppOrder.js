import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal, Form, Row, Col, Image} from 'react-bootstrap';

export default class AddNewSuppOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getDataCustomers: [], // all customers data 
            getDataProducts:[], // all products data
            getCustomersOrders: [], // all customers orders data
            getSuppliersOrders: [], // all suppliers orders data
            getSuppPriceList: [],
            selectedOrder: {},
            selectedOrderDetails:[],
            unorderedCustOrders:[], // get from data base unordered orders 
            getEmployee: {},
            redirectToHome: false,
            showModal: false,
            selectedProducts: [], 
            selectedProduct: null,
            isDisabled: true,  // button Submit order status 
            ifProductSelected: false, 
            ifCustomerSelected: false,
            submitOrderArray:[],
            getQuantity:[],
            isSuccess:false  // show success message in success adding new order
               
           
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.detailsModalWindow = this.detailsModalWindow.bind(this);
        this.createOrder = this.createOrder.bind(this);
        //this.setCustomer = this.setCustomer.bind(this);
       // this.confirmOrder = this.confirmOrder.bind(this);
       // this.insertProdQuantity = this.insertProdQuantity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      //  this.setQuantity = this.setQuantity.bind(this);
      //  this.reset = this.reset.bind(this); 
       
        
             
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
        fetch('/getSuppliersOrders')
        .then(res => res.json())
        .then(getSuppliersOrders => this.setState({getSuppliersOrders}));
        fetch('/getUnorderedCustOrders')
        .then(res => res.json())
        .then(unorderedCustOrders => this.setState({unorderedCustOrders}));
        fetch('/getSuppPriceList')
        .then(res => res.json())
        .then(getSuppPriceList => this.setState({getSuppPriceList}));
        
        //console.log(this.state.getData)
      }
      
      openModal(e) {
        const index = e.target.getAttribute('data-key')
        this.setState({ showModal: true })
        this.setState({ selectedOrder: this.state.unorderedCustOrders[index-1] })
        this.setState({ selectedOrderDetails: this.state.unorderedCustOrders[index-1].OrderDetails })
        
    }
    
    closeModal() {
         this.setState({ showModal: false })
    }

    detailsModalWindow() {
        const {getDataProducts, selectedOrderDetails } = this.state;
       
        let obj = {}
      //   selectedOrder.Customer = getCustomer.WorkName // add property "Customer"  to order modal 
        let result =[]
        let resultArr 
        let header = " "
        let rowdata 
        var orderDetails = selectedOrderDetails
        orderDetails.forEach(joinTables) // for each customer order 

        function joinTables(item) {

            //     let customer = resultCustomers.find((cust) => { if (cust.CustID === item.CustomerID) return cust }) //get all data of Employee that work with current customer
            //   item.Customer = customer.WorkName // add new property WorkName to custOrder object
            // item.EmployeeID = customer.EmployeeID // add new property EmployeeID to custOrder object
            //  item.OrderDetails = [] // add new property with array of  products list of current order 
            for (let i = 0; i <orderDetails.length; i++) {
                let temp = orderDetails[i]
                let product = getDataProducts.find((prod) => { if (prod.ProductID === temp.ProductId) return prod }) // all data of product
                    // console.log(product)
                orderDetails[i].ProductName = product.ProductName
                orderDetails[i].Description = product.Description
                    // item.OrderDetails.push(resultCustomersorderdetails[i])

            }

        }
        
        for(let z=0;z<orderDetails.length;z++){
             obj  = orderDetails[z]
            // console.log(obj)       
             let detailsKeys = Object.keys(obj) 
             let detailsValues = Object.values(obj)
            
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

     

      createOrder(e){ // save it to array with all customer orders 
       // this.setState({redirectToHome:true})
       const {selectedCustomer, getCustomersOrders,submitOrderArray,getDataProducts,unorderedCustOrders, getSuppPriceList} = this.state
       var date = new Date();
       var currentDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
       var shipDate = new Date();
       var numberOfDaysToAdd = 3; // const of shiping dates from suppliers
       shipDate.setDate(shipDate.getDate() + numberOfDaysToAdd); 
      
       var arrayOfOrdersPerSupplier
       var currentOrder = unorderedCustOrders.find((order) => {if( e.target.getAttribute('data-key')==order.CustOrderID) return order}) // current custOrder
      
       console.log(currentOrder)

       for(let i=0;i<currentOrder.OrderDetails.length;i++){ //for each productID search random Supplier 


       }
    //    var customerOrder = {} // greate a new order to add to data base
    //    let id = (parseInt(getCustomersOrders[getCustomersOrders.length-1].CustOrderID) + 1 ).toString()
    //    customerOrder._id = id
    //    customerOrder.CustOrderID = id
    //    customerOrder.CustomerID = selectedCustomer.CustID // customer ID 
    //    customerOrder.OrderIncomeDate = currentDate
    //    customerOrder.OrderShippingDate = shipDate.getFullYear() + "-" + (shipDate.getMonth()+1) + "-" + shipDate.getDate()
    //    customerOrder.Customer = selectedCustomer.WorkName
    //    customerOrder.EmployeeID  = this.props.activeUser.EmployeeId // number of agent 
    //    var orderDetailsArray = [] // greate a new order to add to data base
    //    for(let i=0;i<submitOrderArray.length;i++){
    //          let orderDetails={}
    //         // let index =  getCustomersOrders[getCustomersOrders.length-1].OrderDetails.length // length of product array in last custOrder
    //         // let id = (parseInt(getCustomersOrders[getCustomersOrders.length-1].OrderDetails[index-1].ID)+1+i).toString() //get to next ID 
    //         // orderDetails._id = id
    //         // orderDetails.ID = id
    //        //  orderDetails.OrderId = customerOrder.CustOrderID
    //          orderDetails.ProductId = submitOrderArray[i].id
    //          orderDetails.Qty = submitOrderArray[i].quantity
    //          orderDetails.UnitPrice = getDataProducts.find((prod) => {if(orderDetails.ProductId==prod.ProductID) return prod}).ListPrice
    //          orderDetails.Discount = "0.00"
    //          orderDetailsArray = orderDetailsArray.concat(orderDetails)

    //    } 
    //    customerOrder.OrderDetails = orderDetailsArray
    //    console.log(customerOrder)
    //    console.log(orderDetailsArray)

    //    fetch('/insertCustomerOrder',{ // send data to express server 
    //             method: 'POST',
    //             mode: 'cors',
    //             body: JSON.stringify(customerOrder), //customerOrder
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //               },
    //             })
    //             .then((res) => {
    //                 if (res.ok){
    //                   return res.json();
    //                 } else {
    //                   throw new Error ('Something went wrong with your fetch');
    //                 }
    //               }).then((json) => {
    //                 console.log(json);
    //                 this.setState({isSuccess:true})
    //               })
    //     this.closeModal()  
    //     this.setState({redirectToHome:true})    // redirect to mainwindow   
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
        const { redirectToHome, getDataProducts, getDataCustomers , showModal, selectedOrder, isDisabled, submitOrderArray,isSuccess, unorderedCustOrders} = this.state;
        
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

       

        let count = 0 // row number in the table
        
        let Rows = unorderedCustOrders.map(order =>   // generate table with customers
               <tr data-key={++count} > 
                                <td data-key={count} onClick={this.openModal}>{count}</td>
                                <td data-key={count} onClick={this.openModal}>{order.CustOrderID}</td>
                                <td data-key={count} onClick={this.openModal}>{order.Customer}</td>
                                <td data-key={count} onClick={this.openModal}>{order.OrderIncomeDate}</td>
                                <td data-key={count} onClick={this.openModal}>{order.OrderShippingDate}</td>
                                <td><Button size="sm" data-key={order.CustOrderID} onClick={this.createOrder}>Create Order to Supplier</Button> </td>
               </tr>)
                
        return(
              <Container> <h3 class="text-center"> List of unprocessed orders:</h3>
                     
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
                                <Modal.Title>Order details for: {selectedOrder.CustOrderID}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="mx-auto">
                            <Table responsive="sm" size="sm" >
                                   <tbody>
                                     {this.detailsModalWindow()}
                                   </tbody>
                               </Table> 
                            </Modal.Body>
                
                        <Modal.Footer>
                       
                         <Button variant="secondary" onClick={this.closeModal}>
                            Close
                         </Button>
                         
                        </Modal.Footer>   
                </Modal>

            </Container>
          )
      }
    }