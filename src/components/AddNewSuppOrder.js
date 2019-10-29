import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal, Form, Row, Col, Image} from 'react-bootstrap';
import {supplierOrder} from '../objects/supplierOrder';


export default class AddNewSuppOrder extends React.Component {
    constructor(props) {
        super(props);
        this.trRef = React.createRef();
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
       const {getSuppliersOrders,unorderedCustOrders, getSuppPriceList} = this.state
       var date = new Date();
       var currentDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
       var shipDate = new Date();
       var numberOfDaysToAdd = 3; // const of shiping dates from suppliers
       shipDate.setDate(shipDate.getDate() + numberOfDaysToAdd); 
       shipDate = shipDate.getFullYear() + "-" + (shipDate.getMonth()+1) + "-" + shipDate.getDate()
       var paymentDate = new Date();
       var numberOfDaysToAdd1 = 60; // const of shiping dates from suppliers
       paymentDate.setDate(paymentDate.getDate() + numberOfDaysToAdd1); 
       paymentDate = paymentDate.getFullYear() + "-" + (paymentDate.getMonth()+1) + "-" + paymentDate.getDate()

       var currentOrder = unorderedCustOrders.find((order) => {if( e.target.getAttribute('data-key')==order.CustOrderID) return order}) // current custOrder
       var arrayOfOrders = []      
       
       console.log(currentOrder)

       for(let i=0;i<currentOrder.OrderDetails.length;i++){ //for each productID search random Supplier 
           let count = 0 
           let suppliersPerProduct = []
           let prodId
           prodId = currentOrder.OrderDetails[i].ProductId
           console.log(getSuppPriceList)  
           console.log("prodId: " + prodId)    
           for(let j=0;j<getSuppPriceList.length;j++){ //runs on all pricelist table
               if(prodId==getSuppPriceList[j].ProductId){
                count++
                suppliersPerProduct.push(getSuppPriceList[j].SuppId) // list suppliers for each product 
               }
               
           }
           console.log("count: " + count)  
           console.log("suppliersPerProduct: " + suppliersPerProduct)       
           let x = Math.floor((Math.random() * count) + 1);
           console.log("x: " + x)
           let randomSupplier = suppliersPerProduct[x-1] // random supplier for current prodId 
           // if array still empty 
           console.log("arrayOfOrders.length: " + arrayOfOrders.length)
          
          
           if(arrayOfOrders.length===0){ 
              // if the first order push into the array - new SuppOrderID 
              
               // create first supplier order
               var id = (parseInt(getSuppliersOrders.length)+5000).toString() //suppOrderID - 5XXX - format 
               var summ = 0 
               var quantity = parseFloat(currentOrder.OrderDetails[i].Qty)
               console.log("quantity: " + quantity)
            
              for(let z=0;z<getSuppPriceList.length;z++){  // get price from pricelist by supplier
                   if(getSuppPriceList[z].ProductId==prodId&&getSuppPriceList[z].SuppId==randomSupplier){
                   summ = parseFloat(getSuppPriceList[z].SuppPrice)*quantity
                   console.log("price : " + getSuppPriceList[i].SuppPrice)}
               }
               let orderDetails = {}
               orderDetails.OrderId = id
               orderDetails.ProductId = prodId
               orderDetails.Qty=quantity
               
               var suppOrder = new supplierOrder (id,id,randomSupplier,currentDate,shipDate,paymentDate, currentOrder.CustOrderID,summ,parseInt(summ*(1.17)))
               suppOrder.OrderDetails.push(orderDetails)
               console.log("Create first order")
               //console.log(suppOrder)
               arrayOfOrders=arrayOfOrders.concat(suppOrder) // add to orders array
              // console.log(arrayOfOrders)
           }
           
            else{
                   // seach if already we have orders to this supplier
                   // check if exists order from this supplier 
                   //if random supplier of next product is already exits 
                   for(let j=0;j<arrayOfOrders.length;j++){
                       if(arrayOfOrders[j].SupplierID == randomSupplier){
                           var index = j 
                           break;}
                       else index = NaN }
                       
                 //  var existsObject = arrayOfOrders.find((item) => {if(item.SupplierID == randomSupplier) return item})
                   console.log("If exists supplier with same ID :" + index)
                   if (!isNaN(index)){ // if exists add to order 
                         console.log("Need to add product to exist order")
                         
                         for(let z=0;z<getSuppPriceList.length;z++){ //get price from pricelist by supplier
                            if(getSuppPriceList[z].ProductId==prodId && getSuppPriceList[z].SuppId==randomSupplier){
                            summ = parseFloat(getSuppPriceList[z].SuppPrice)*parseFloat(currentOrder.OrderDetails[i].Qty)
                            console.log("price : " + getSuppPriceList[i].SuppPrice)}
                         } 
                         arrayOfOrders[index].Summ+= summ
                         arrayOfOrders[index].TotalSumm = parseInt(arrayOfOrders[index].Summ*(1.17))
                         let orderDetails = {}
                         orderDetails.OrderId = arrayOfOrders[index]._id
                         orderDetails.ProductId = prodId
                         orderDetails.Qty=parseFloat(currentOrder.OrderDetails[i].Qty)
                         arrayOfOrders[index].OrderDetails.push(orderDetails)
                    }
                    else { //if not exists as 
                            console.log("Need to create new  order")
                         // make new order for supplier for this product  - new SuppOrderID 

                         id = (parseInt(getSuppliersOrders.length)+5000+arrayOfOrders.length).toString() //suppOrderID - 5XXX - format 
                         summ = 0 
                         quantity = parseFloat(currentOrder.OrderDetails[i].Qty)
                         console.log("quantity: " + quantity)
                      
                        for(let z=0;z<getSuppPriceList.length;z++){  // get price from pricelist by supplier
                             if(getSuppPriceList[z].ProductId==prodId&&getSuppPriceList[z].SuppId==randomSupplier){
                             summ = parseFloat(getSuppPriceList[z].SuppPrice)*quantity
                             console.log("price : " + getSuppPriceList[i].SuppPrice)}
                         }
                         let orderDetails = {}
                         orderDetails.OrderId = id
                         orderDetails.ProductId = prodId
                         orderDetails.Qty=quantity
                         
                         suppOrder = new supplierOrder (id,id,randomSupplier,currentDate,shipDate,paymentDate, currentOrder.CustOrderID,summ,parseInt(summ*(1.17)))
                         suppOrder.OrderDetails.push(orderDetails)
                         console.log("Create first order")
                         //console.log(suppOrder)
                         arrayOfOrders=arrayOfOrders.concat(suppOrder) // add to orders array
                        // console.log(arrayOfOrders)
                  }
                          
                } 
        
       }
       console.log(arrayOfOrders)
      
       fetch('/insertSupplierOrder',{ // send data to express server 
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(arrayOfOrders), //customerOrder
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
      
        this.setState({redirectToHome:true})    // redirect to mainwindow   
        e.target.style.visibility = 'hidden'
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
        const { redirectToHome, showModal, selectedOrder, isSuccess, unorderedCustOrders} = this.state;
        
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
              <Container> <h3 className="text-center"> List of unprocessed orders:</h3>
                     
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