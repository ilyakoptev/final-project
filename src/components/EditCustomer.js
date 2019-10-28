import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Row, Col, Form, InputGroup} from 'react-bootstrap';


export default class EditCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getDataCustomers: [],
            getDataEmployees:[],
            newCustomer: {},
            selectedCustomer: {}, // selected customer to change details 
            getEmployee: {},
            redirectToHome: false,
            customerRowNum: null, 
            validated: false,
            isSuccess: false,
            showForm: "d-none",
            isDisabled: false,  // button Submit order status 
            fieldValidation:{ // insert all values as false for hiding submit button 
                workName:true,
                crn: true,
                company:true,
                name1: true,
                telephone1: true,
                name2: true,
                telephone2: true,
                email: true,
                city: true,
                country: true
            }
        }

        this.validateFields = this.validateFields.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
        this.setCustomer = this.setCustomer.bind(this)
       // this.detailsModalWindow = this.detailsModalWindow.bind(this);
        
    }
    componentDidMount(){
        fetch('/getdataCustomers') // get promise
        .then(res => res.json())  //get json 
        .then(getDataCustomers => this.setState({getDataCustomers})); // get data from json and set on state
        // fetch('/getdataEmployees')
        // .then(res => res.json())
        // .then(getDataEmployees => this.setState({getDataEmployees}));
        //console.log(this.state.getData)
      }
   
    setCustomer(e){   // set state for customer for new order 
        const {getDataCustomers} = this.state
        let customer = getDataCustomers.find((cust) => {if(cust.CustID == e.target.value) return cust})
        this.setState({selectedCustomer:customer})
        this.setState({showForm:""})
        console.log(customer)
     }
   
   changeStatus(key,status){
    const { isDisabled , fieldValidation} = this.state;
        switch (key){
            case "workName":
                      this.setState(prevState => {
                      let fieldValidation = Object.assign({}, prevState.fieldValidation);  // creating copy of state variable fieldValidatione
                      //fieldValidation = {[key] : status};         
                      fieldValidation.workName = status;                     // update the name property, assign a new value                 
                      return { fieldValidation };                                 // return new object fieldValidatione object
                     }) 
                     break;
            case "crn":
                    this.setState(prevState => {
                    let fieldValidation = Object.assign({}, prevState.fieldValidation);  // creating copy of state variable fieldValidatione
                    //fieldValidation = {[key] : status};         
                    fieldValidation.crn = status;                     // update the name property, assign a new value                 
                    return { fieldValidation };                                 // return new object fieldValidatione object
                   }) 
                   break;
            case "company":
                  this.setState(prevState => {
                  let fieldValidation = Object.assign({}, prevState.fieldValidation);  // creating copy of state variable fieldValidatione
                  //fieldValidation = {[key] : status};         
                  fieldValidation.company = status;                     // update the name property, assign a new value                 
                  return { fieldValidation };                                 // return new object fieldValidatione object
                }) 
                break; 
            case "name1":
                    this.setState(prevState => {
                    let fieldValidation = Object.assign({}, prevState.fieldValidation);  // creating copy of state variable fieldValidatione
                    //fieldValidation = {[key] : status};         
                    fieldValidation.name1 = status;                     // update the name property, assign a new value                 
                    return { fieldValidation };                                 // return new object fieldValidatione object
                  }) 
                  break;                
           case "telephone1":
                 this.setState(prevState => {
                 let fieldValidation = Object.assign({}, prevState.fieldValidation);  // creating copy of state variable fieldValidatione
                 //fieldValidation = {[key] : status};         
                 fieldValidation.telephone1 = status;                     // update the name property, assign a new value                 
                 return { fieldValidation };                                 // return new object fieldValidatione object
                }) 
                break; 
           case "name2":
                   this.setState(prevState => {
                   let fieldValidation = Object.assign({}, prevState.fieldValidation);  // creating copy of state variable fieldValidatione
                   //fieldValidation = {[key] : status};         
                   fieldValidation.name2 = status;                     // update the name property, assign a new value                 
                   return { fieldValidation };                                 // return new object fieldValidatione object
                 }) 
                 break;                
          case "telephone2":
                this.setState(prevState => {
                let fieldValidation = Object.assign({}, prevState.fieldValidation);  // creating copy of state variable fieldValidatione
                //fieldValidation = {[key] : status};         
                fieldValidation.telephone2 = status;                     // update the name property, assign a new value                 
                return { fieldValidation };                                 // return new object fieldValidatione object
               }) 
               break;
         case "email":
              this.setState(prevState => {
              let fieldValidation = Object.assign({}, prevState.fieldValidation);  // creating copy of state variable fieldValidatione
              //fieldValidation = {[key] : status};         
              fieldValidation.email = status;                     // update the name property, assign a new value                 
              return { fieldValidation };                                 // return new object fieldValidatione object
             }) 
             break;             
         case "city":
                this.setState(prevState => {
                let fieldValidation = Object.assign({}, prevState.fieldValidation);  // creating copy of state variable fieldValidatione
                //fieldValidation = {[key] : status};         
                fieldValidation.city = status;                     // update the name property, assign a new value                 
                return { fieldValidation };                                 // return new object fieldValidatione object
               }) 
               break;             
         case "country":
              this.setState(prevState => {
              let fieldValidation = Object.assign({}, prevState.fieldValidation);  // creating copy of state variable fieldValidatione
              //fieldValidation = {[key] : status};         
              fieldValidation.country = status;                     // update the name property, assign a new value                 
              return { fieldValidation };                                 // return new object fieldValidatione object
             }) 
             break;             
             default: break; 
        } 
        
        
      // check of all field are ok and visible to submit button 
      
       let fieldValidationValues = Object.values(fieldValidation)
       let submit = !isDisabled  //set false to visible 
       submit = fieldValidationValues.find((item)=>{  // if one value still false as button still invisible 
                   if(!item) 
                   console.log("item: " + item) 
                   return !item
                  })
       for(let i=0;i<fieldValidationValues.length;i++){
           if(!fieldValidationValues[i])
              submit = true
       }
       this.setState({isDisabled:submit})
       console.log(submit , isDisabled ) 
       console.log(fieldValidation)
      //   this.setState({workName:"valid"})
      //  alert(this.state.fieldValidation.workName)
      }
      validateFields(e){
       const { getDataCustomers, isDisabled , fieldValidation, newCustomer, selectedCustomer} = this.state;
       console.log("on start") 
       console.log(e.target.value.toUpperCase(),e.target.value.length, e.target.id )  
       console.log(fieldValidation) 
       console.log(selectedCustomer) 
       console.log("****************") 
       var insertData = e.target.value
       let selectedCustomerCopy = Object.assign({}, this.state.selectedCustomer); // creating copy of state variable fieldValidatione
       switch (e.target.id){
           case "workName" :  
                        if(insertData.length<3||insertData.length>5 || !isNaN(insertData)){  // length between 2-5
                           this.changeStatus(e.target.id,false)
                           break;}
                       
                        if(insertData.length<4 && insertData.includes("-",2) ){  // if length > 4 so format must be X-XXX
                            this.changeStatus(e.target.id,false)
                           break;}
                        // custName = getDataCustomers.find((cust) => { if(cust.CustID==1000) return cust})
                        insertData = insertData.toUpperCase() 
                        let custName = getDataCustomers.find((cust) => { if(cust.WorkName==insertData) return cust}) //check if already exist customer with same WorkName
                        console.log("WorkName : " + custName, e.target.value.toUpperCase())   
                        if(custName!==undefined){
                            this.changeStatus(e.target.id,false)
                           break;}
                        
                        this.changeStatus(e.target.id,true)
                        e.target.value = insertData  // show in input in database format 
                       
                        selectedCustomerCopy.WorkName = insertData;  // update the name property, assign a new value     
                        this.setState({selectedCustomer:selectedCustomerCopy});   // setState to  object
                     
                   console.log(fieldValidation)
                   console.log(insertData.length)
                   console.log(e.target.id) 
                   console.log(selectedCustomer) 
                   break ;
           case "crn" :
                if(insertData.length < 7 || insertData.length > 13  || isNaN(insertData)){  // length between 2-5
                    this.changeStatus(e.target.id,false)
                    break;}
                let crn = getDataCustomers.find((cust) => { if(cust.CRN==insertData) return cust}) //check if already exist customer with this CRN
                console.log("CRN : " + crn, e.target.value)  
                if(crn!==undefined){
                    this.changeStatus(e.target.id,false)
                   break;}    
                this.changeStatus(e.target.id,true)
                 selectedCustomerCopy.CRN = insertData;  // update the name property, assign a new value     
                 this.setState({selectedCustomer:selectedCustomerCopy});   // setState to  object
                
                    console.log(fieldValidation)
                   console.log(insertData.length)
                   console.log(e.target.id) 
                   console.log(selectedCustomer) 
                break;
           case "company" :
                if( insertData.length < 3 || !isNaN(insertData)){  // length between 2-5
                    this.changeStatus(e.target.id,false)
                    break;}
                this.changeStatus(e.target.id,true)
                selectedCustomerCopy.Company = insertData;  // update the name property, assign a new value     
                this.setState({selectedCustomer:selectedCustomerCopy});   // setState to  object
                   console.log(fieldValidation)
                   console.log(insertData.length)
                   console.log(e.target.id) 
                   console.log(selectedCustomer) 
                break;
           case "name1" :
                   if( insertData.length < 3 || !isNaN(insertData)){  // length between 2-5
                       this.changeStatus(e.target.id,false)
                       break;}
                   this.changeStatus(e.target.id,true)
                   insertData = insertData.toLowerCase()
                   insertData = insertData.charAt(0).toUpperCase() + insertData.slice(1);
                   e.target.value = insertData  // show in input in database format 
              
                   selectedCustomerCopy.ContactName = insertData;  // update the name property, assign a new value     
                     this.setState({selectedCustomer:selectedCustomerCopy});   // setState to  object
                  
                   console.log(fieldValidation)
                   console.log(insertData.length)
                   console.log(e.target.id) 
                   console.log(selectedCustomer) 
                   break;     
          case "telephone1" :
                   if(insertData.length < 7 || insertData.length > 13  || isNaN(insertData)){  // length between 2-5
                      this.changeStatus(e.target.id,false)
                      break;}
                   this.changeStatus(e.target.id,true)
                   selectedCustomerCopy.Telephone = insertData;  // update the name property, assign a new value     
                   this.setState({selectedCustomer:selectedCustomerCopy});   // setState to  object
               
                  console.log(fieldValidation)
                  console.log(insertData.length)
                  console.log(e.target.id) 
                  console.log(selectedCustomer) 
               break;
             case "name2" :
                    if( insertData.length < 3 || !isNaN(insertData)){  // length between 2-5
                        this.changeStatus(e.target.id,false)
                        break;}
                    this.changeStatus(e.target.id,true)
                    insertData = insertData.toLowerCase()
                    insertData = insertData.charAt(0).toUpperCase() + insertData.slice(1);
                    e.target.value = insertData  // show in input in database format 
                    selectedCustomerCopy.ContactName2 = insertData;  // update the name property, assign a new value     
                        this.setState({selectedCustomer:selectedCustomerCopy});   // setState to  object
                       console.log(fieldValidation)
                       console.log(insertData.length)
                       console.log(e.target.id) 
                       console.log(selectedCustomer) 
                    break;     
           case "telephone2" :
                if(insertData.length < 7 || insertData.length > 13  || isNaN(insertData)){  // length between 2-5
                    this.changeStatus(e.target.id,false)
                    break;}
                this.changeStatus(e.target.id,true)
                selectedCustomerCopy.Telephone2 = insertData;  // update the name property, assign a new value     
                     this.setState({selectedCustomer:selectedCustomerCopy});   // setState to  object
                    console.log(fieldValidation)
                   console.log(insertData.length)
                   console.log(e.target.id) 
                   console.log(selectedCustomer) 
                break;
         case "city" :
                 if(insertData.length < 3 || insertData.length > 20  || !isNaN(insertData)){  // length between 2-5
                     this.changeStatus(e.target.id,false)
                     break;}
                 this.changeStatus(e.target.id,true)
                 insertData = insertData.toLowerCase()
                 insertData = insertData.charAt(0).toUpperCase() + insertData.slice(1);
                 e.target.value = insertData  // show in input in database format 
                 selectedCustomerCopy.City = insertData;  // update the name property, assign a new value     
                 this.setState({selectedCustomer:selectedCustomerCopy});   // setState to  object
                     console.log(fieldValidation)
                    console.log(insertData.length)
                    console.log(e.target.id) 
                    console.log(selectedCustomer) 
                 break;
         case "country" :
                 if(insertData.length < 3 || insertData.length > 20  || !isNaN(insertData)){  // length between 2-5
                     this.changeStatus(e.target.id,false)
                     break;}
                 this.changeStatus(e.target.id,true)
                 insertData = insertData.toLowerCase()
                 insertData = insertData.charAt(0).toUpperCase() + insertData.slice(1);
                 e.target.value = insertData  // show in input in database format 
                 selectedCustomerCopy.Country = insertData;  // update the name property, assign a new value     
                    this.setState({selectedCustomer:selectedCustomerCopy});   // setState to  object
                     console.log(fieldValidation)
                    console.log(insertData.length)
                    console.log(e.target.id) 
                    console.log(selectedCustomer) 
                 break;        
         case "email" :
                console.log("Email") 
                 console.log(this.validateEmail(insertData)) 
                 console.log("********") 
                 if(!this.validateEmail(insertData)){  // length between 2-5
                     this.changeStatus(e.target.id,false)
                     break;}
                 this.changeStatus(e.target.id,true)
                 selectedCustomerCopy.Email = insertData;  // update the name property, assign a new value     
                        this.setState({selectedCustomer:selectedCustomerCopy});   // setState to  object
                    console.log(fieldValidation)
                    console.log(insertData.length)
                    console.log(e.target.id) 
                    console.log(selectedCustomer) 
                 break;   
                   default :  console.log("default")  ///^[^\s@]+@[^\s@]+\.[^\s@]+$/
       } 

    
     }    
   
     validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
           }
        
     
     handleSubmit(){
        const {selectedCustomer} = this.state;
        let customer  = selectedCustomer
        //let employeeId = this.props.activeUser.EmployeeId
        console.log(customer)
       // this.setState({selectedCustomer:customer})

        fetch('/editCustomer',{ // send data to express server 
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(customer),
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
     }


     reset(){
       let fieldValidation = { // reset checking all fields on reset action
            workName:false,
            crn: false,
            company:false,
            name1: false,
            telephone1: false,
            name2: true,
            telephone2: true,
            email: false,
            city: false,
            country: false
        }
        this.setState({fieldValidation:fieldValidation})
     }
     render() {
        const { redirectToHome, validated , fieldValidation, isDisabled, isSuccess, getDataCustomers, showForm, selectedCustomer} = this.state;
        // print this message after to get u success json from server 
        if (isSuccess) {
            return <Container>
                     <Row>
                         <Col> <h2 className="text-success text-center">Update was successfull</h2> </Col>
                     </Row>
                  </Container>
        }
        if (redirectToHome) {
            return <Redirect to="/dashboard"/>
        }
        let count = 0 
        let customerRows = getDataCustomers.map(cust =>   // generate list with customers
            <option value={cust.CustID}>{++count} - {cust.WorkName} , {cust.Company} , {cust.Email} </option>
            )
      // console.log( this.state.getData[0].City )
      // console.log(newCustomer.City ) 
      //  console.log( Object.keys(newCustomer) ) 
        return(
              <Container> 
                  <Row>
                      <Col><h2 class="text-center"> Edit customers details </h2></Col>
                  </Row>
                  <Row>
                            <Col xs={4} xl={3} >
                            <Form.Label>  <h5> Choose Customer: </h5></Form.Label>
                            </Col>
                            <Col xs={8} xl={9} >
                                     <Form.Control as="select" onChange={this.setCustomer} >
                                        <option selected disabled>Select Customer:</option>
                                        {customerRows}       
                                     </Form.Control>
                            </Col>
                            
                        </Row>
               <Row className={showForm}>
                 <Col>
                 <Form noValidate validated={validated} onSubmit={this.handleSubmit} >
                  
                     <Form.Row>
                       <Form.Group as={Col} md="4" controlId="workName" onChange={this.validateFields} >
                         <Form.Label>WorkName</Form.Label>
                         <Form.Control
                        //    required
                           type="text"
                           placeholder={selectedCustomer.WorkName}
                           isValid={fieldValidation.workName}
                           isInvalid={!fieldValidation.workName}
                         />
                         <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                           Please provide a valid WorkName.
                         </Form.Control.Feedback>
                     
                       </Form.Group>
                       <Form.Group as={Col} md="4" controlId="crn" onChange={this.validateFields}>
                         <Form.Label>CRN</Form.Label>
                         <Form.Control
                           required
                           type="text"
                           placeholder={selectedCustomer.CRN}
                           isValid={fieldValidation.crn}
                           isInvalid={!fieldValidation.crn}
                           
                         />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a valid CRN Number.
                         </Form.Control.Feedback>
                       </Form.Group>

                       <Form.Group as={Col} md="4" controlId="company" onChange={this.validateFields}>
                         <Form.Label>Company Name</Form.Label>
                           <Form.Control
                             type="text"
                             placeholder={selectedCustomer.Company}
                             required
                             isValid={fieldValidation.company}
                             isInvalid={!fieldValidation.company}
                           />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                           <Form.Control.Feedback type="invalid">
                           Please provide a valid Company name.
                           </Form.Control.Feedback>
                        
                       </Form.Group>
                     </Form.Row>
                  
                  
                     <Form.Row>
                       <Form.Group as={Col} md="3" controlId="name1" onChange={this.validateFields}>
                         <Form.Label>Contact Name</Form.Label>
                         <Form.Control type="text" placeholder={selectedCustomer.ContactName}
                         required 
                         isValid={fieldValidation.name1}
                             isInvalid={!fieldValidation.name1}
                         />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a Contact Name
                         </Form.Control.Feedback>
                       </Form.Group>
                   
                       <Form.Group as={Col} md="3" controlId="telephone1" onChange={this.validateFields}>
                         <Form.Label>Telephone</Form.Label>
                         <Form.Control type="text" placeholder={selectedCustomer.Telephone}
                          required 
                          isValid={fieldValidation.telephone1}
                             isInvalid={!fieldValidation.telephone1}
                             />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a valid Telephone number.
                         </Form.Control.Feedback>
                       </Form.Group>
                   
                       <Form.Group as={Col} md="3" controlId="name2" onChange={this.validateFields}>
                         <Form.Label>Contact Name 2</Form.Label>
                         <Form.Control type="text" placeholder={selectedCustomer.ContactName2} />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a Contact Name
                         </Form.Control.Feedback>
                       </Form.Group>
                   
                       <Form.Group as={Col} md="3" controlId="telephone2" onChange={this.validateFields}>
                         <Form.Label>Telephone 2</Form.Label>
                         <Form.Control type="text" placeholder={selectedCustomer.Telephone2} />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a valid Telephone number.
                         </Form.Control.Feedback>
                       </Form.Group>
                      </Form.Row>

                      <Form.Row>
                       <Form.Group as={Col} md="8" controlId="address">
                         <Form.Label>Adrress</Form.Label>
                         <Form.Control type="text" placeholder={selectedCustomer.Address}  />
                         <Form.Control.Feedback type="invalid">
                           Please provide a Contact Name
                         </Form.Control.Feedback>
                       </Form.Group>
                   
                       <Form.Group as={Col} md="2" controlId="city" onChange={this.validateFields}>
                         <Form.Label>City</Form.Label>
                         <Form.Control type="text" placeholder={selectedCustomer.City} required 
                          isValid={fieldValidation.city}
                             isInvalid={!fieldValidation.city}
                             />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a valid City.
                         </Form.Control.Feedback>
                       </Form.Group>
                   
                       <Form.Group as={Col} md="2" controlId="country" onChange={this.validateFields}>
                         <Form.Label>Country</Form.Label>
                         <Form.Control type="text" placeholder={selectedCustomer.Country} required 
                          isValid={fieldValidation.country}
                             isInvalid={!fieldValidation.country}
                             />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a valid Country name 
                         </Form.Control.Feedback>
                       </Form.Group>
                   
                       
                      </Form.Row>
                      <Form.Row>
                      <Form.Group as={Col} md="12" controlId="email" onChange={this.validateFields}>
                         <Form.Label>E-mail</Form.Label>
                         <Form.Control type="email" 
                          placeholder={selectedCustomer.Email} 
                        //  value={selectedCustomer.Email} 
                          required 
                          isValid={fieldValidation.email}
                          isInvalid={!fieldValidation.email}
                          />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a valid e-mail address 
                         </Form.Control.Feedback>
                       </Form.Group>
                   
                      </Form.Row>
                      <Form.Row>
                      <Col xs={6} >        
                                    <Button className="my-3 btn-block" variant="danger" type="reset" onClick={this.reset}>
                                        <h5>Clear all fields</h5>
                                    </Button>
                            </Col>
                          <Col xs={6} ml="auto">
                                    <Button className="my-3 btn-block"  variant="success" type="submit" disabled={isDisabled}>
                                        <h5>Update Customer Details</h5>
                                    </Button>
                                    </Col>
                            
                      </Form.Row>

                   </Form>
                 </Col>   
                </Row>  
                        

            </Container>
          )
      }
    }