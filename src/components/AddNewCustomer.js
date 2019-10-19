import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Row, Col, Form, InputGroup} from 'react-bootstrap';


export default class AddNewCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getDataCustomers: [],
            getDataEmployees:[],
            newCustomer: {},
            getEmployee: {},
            redirectToHome: false,
            isDisabled: true,  // button Submit order status 
            customerRowNum: null, 
            validated: false,
            fieldValidation:{
                workName:false,
                crn: false,
                company:false,
                name1: false,
                telephone1: false,
                name2: false,
                telephone2: false,
                email: false
            }
        }

        this.validateFields = this.validateFields.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       // this.closeModal = this.closeModal.bind(this);
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
      changeStatus(key,status){
      
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
                  default: break; 
        }   
      }
      validateFields(e){
       const { getDataCustomers, isDisabled , fieldValidation, newCustomer} = this.state;
       console.log("on start") 
       console.log(e.target.value.toUpperCase(),e.target.value.length, e.target.id )  
       console.log(fieldValidation) 
       console.log(newCustomer) 
       console.log("****************") 
       var insertData = e.target.value
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
                        let custName = getDataCustomers.find((cust) => { if(cust.WorkName==insertData) return cust})
                        console.log(custName, e.target.value.toUpperCase())  
                        if(custName!==undefined){
                            this.changeStatus(e.target.id,false)
                           break;}
                       
                        this.changeStatus(e.target.id,true)
                        this.setState(prevState => {
                        let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                        newCustomer.WorkName = insertData;                     // update the name property, assign a new value                 
                        return { newCustomer };                                 // return new object fieldValidatione object
                        })
                   
                   console.log(fieldValidation)
                   console.log(insertData.length)
                   console.log(e.target.id) 
                   console.log(newCustomer) 
                   break ;
           case "crn" :
                if(insertData.length < 7 || insertData.length > 13  || isNaN(insertData)){  // length between 2-5
                    this.changeStatus(e.target.id,false)
                    break;}
                this.changeStatus(e.target.id,true)
                this.setState(prevState => {
                    let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                    newCustomer.CRN = insertData;                     // update the name property, assign a new value                 
                    return { newCustomer };                                 // return new object fieldValidatione object
                    })
                    console.log(fieldValidation)
                   console.log(insertData.length)
                   console.log(e.target.id) 
                   console.log(newCustomer) 
                break;
           case "company" :
                if( insertData.length < 3 || !isNaN(insertData)){  // length between 2-5
                    this.changeStatus(e.target.id,false)
                    break;}
                this.changeStatus(e.target.id,true)
                this.setState(prevState => {
                    let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                    newCustomer.Company = insertData;                     // update the name property, assign a new value                 
                    return { newCustomer };                                 // return new object fieldValidatione object
                    })
                   console.log(fieldValidation)
                   console.log(insertData.length)
                   console.log(e.target.id) 
                   console.log(newCustomer) 
                break;
           case "name1" :
                   if( insertData.length < 3 || !isNaN(insertData)){  // length between 2-5
                       this.changeStatus(e.target.id,false)
                       break;}
                   this.changeStatus(e.target.id,true)
                   insertData = insertData.toLowerCase()
                   insertData = insertData.charAt(0).toUpperCase() + insertData.slice(1);
                   this.setState(prevState => {
                       let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                       newCustomer.ContactName = insertData;                     // update the name property, assign a new value                 
                       return { newCustomer };                                 // return new object fieldValidatione object
                       })
                      console.log(fieldValidation)
                      console.log(insertData.length)
                      console.log(e.target.id) 
                      console.log(newCustomer) 
                   break;     
          case "telephone1" :
               if(insertData.length < 7 || insertData.length > 13  || isNaN(insertData)){  // length between 2-5
                   this.changeStatus(e.target.id,false)
                   break;}
               this.changeStatus(e.target.id,true)
               this.setState(prevState => {
                   let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                   newCustomer.Telephone = insertData;                     // update the name property, assign a new value                 
                   return { newCustomer };                                 // return new object fieldValidatione object
                   })
                   console.log(fieldValidation)
                  console.log(insertData.length)
                  console.log(e.target.id) 
                  console.log(newCustomer) 
               break;
             case "name2" :
                    if( insertData.length < 3 || !isNaN(insertData)){  // length between 2-5
                        this.changeStatus(e.target.id,false)
                        break;}
                    this.changeStatus(e.target.id,true)
                    insertData = insertData.toLowerCase()
                    insertData = insertData.charAt(0).toUpperCase() + insertData.slice(1);
                    this.setState(prevState => {
                        let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                        newCustomer.ContactName2 = insertData;                     // update the name property, assign a new value                 
                        return { newCustomer };                                 // return new object fieldValidatione object
                        })
                       console.log(fieldValidation)
                       console.log(insertData.length)
                       console.log(e.target.id) 
                       console.log(newCustomer) 
                    break;     
           case "telephone2" :
                if(insertData.length < 7 || insertData.length > 13  || isNaN(insertData)){  // length between 2-5
                    this.changeStatus(e.target.id,false)
                    break;}
                this.changeStatus(e.target.id,true)
                this.setState(prevState => {
                    let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                    newCustomer.Telephone2 = insertData;                     // update the name property, assign a new value                 
                    return { newCustomer };                                 // return new object fieldValidatione object
                    })
                    console.log(fieldValidation)
                   console.log(insertData.length)
                   console.log(e.target.id) 
                   console.log(newCustomer) 
                break;
         case "email" :
                console.log("Email") 
                 console.log(this.validateEmail(insertData)) 
                 console.log("********") 
                 if(!this.validateEmail(insertData)){  // length between 2-5
                     this.changeStatus(e.target.id,false)
                     break;}
                 this.changeStatus(e.target.id,true)
                 this.setState(prevState => {
                     let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                     newCustomer.Email = insertData;                     // update the name property, assign a new value                 
                     return { newCustomer };                                 // return new object fieldValidatione object
                     })
                    console.log(fieldValidation)
                    console.log(insertData.length)
                    console.log(e.target.id) 
                    console.log(newCustomer) 
                 break;   
                   default :  console.log("default")  ///^[^\s@]+@[^\s@]+\.[^\s@]+$/
       } 

      



      
       let fieldValidationValues = Object.values(fieldValidation)
       let submit = !isDisabled  //set false to visible 
       submit = fieldValidationValues.find((item)=>{
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
   
     validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
           }

     
     
     handleSubmit(){
        console.log(this.state.newCustomer)
     }
   
     render() {
        const { redirectToHome, validated , fieldValidation, isDisabled} = this.state;
       
        if (redirectToHome) {
            return <Redirect to="/"/>
        }
       
      // console.log( this.state.getData[0].City )
      // console.log(newCustomer.City ) 
      //  console.log( Object.keys(newCustomer) ) 
        return(
              <Container> 
                  <Row>
                      <Col><h2 class="text-center"> Add new customer</h2></Col>
                  </Row>
               <Row>
                 <Col>
                 <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                  
                     <Form.Row>
                       <Form.Group as={Col} md="4" controlId="workName" onChange={this.validateFields} >
                         <Form.Label >WorkName</Form.Label>
                         <Form.Control
                        //    required
                           type="text"
                           placeholder="WorkName in format XXX or X-XXX"
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
                           placeholder="CRN"
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
                             placeholder="Company Name"
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
                         <Form.Control type="text" placeholder="Contact Name 1" 
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
                         <Form.Control type="text" placeholder="Telephone 1"
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
                         <Form.Control type="text" placeholder="Contact Name 1"  />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a Contact Name
                         </Form.Control.Feedback>
                       </Form.Group>
                   
                       <Form.Group as={Col} md="3" controlId="telephone2" onChange={this.validateFields}>
                         <Form.Label>Telephone 2</Form.Label>
                         <Form.Control type="text" placeholder="Telephone 2"  />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a valid Telephone number.
                         </Form.Control.Feedback>
                       </Form.Group>
                      </Form.Row>

                      <Form.Row>
                       <Form.Group as={Col} md="8" controlId="validationCustom03">
                         <Form.Label>Adrress</Form.Label>
                         <Form.Control type="text" placeholder="Adrress"  />
                         <Form.Control.Feedback type="invalid">
                           Please provide a Contact Name
                         </Form.Control.Feedback>
                       </Form.Group>
                   
                       <Form.Group as={Col} md="2" controlId="validationCustom04">
                         <Form.Label>City</Form.Label>
                         <Form.Control type="text" placeholder="City" required />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a valid City.
                         </Form.Control.Feedback>
                       </Form.Group>
                   
                       <Form.Group as={Col} md="2" controlId="validationCustom03">
                         <Form.Label>Country</Form.Label>
                         <Form.Control type="text" placeholder="Country" required />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a valid Country name 
                         </Form.Control.Feedback>
                       </Form.Group>
                   
                       
                      </Form.Row>
                      <Form.Row>
                      <Form.Group as={Col} md="12" controlId="email" onChange={this.validateFields}>
                         <Form.Label>E-mail</Form.Label>
                         <Form.Control type="email" placeholder="E-mail"
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
                                    <Button className="my-3 btn-block" variant="danger" type="reset">
                                        <h5>Reset all fields</h5>
                                    </Button>
                            </Col>
                          <Col xs={6} ml="auto">
                                    <Button className="my-3 btn-block"  variant="success" type="submit" disabled={isDisabled}>
                                        <h5>Insert New Customer </h5>
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