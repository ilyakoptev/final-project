import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Row, Col, Form,} from 'react-bootstrap';
import Loading from './Loading';

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
            validated: false,
            isSuccess: false,
            isLoading: "",
            fieldValidation:{ // insert all values as false for hiding submit button 
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
        }

        this.validateFields = this.validateFields.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
      
    }
    componentDidMount(){
        fetch('/getdataCustomers') // get promise
        .then(res => res.json())  //get json 
        .then(getDataCustomers => this.setState({getDataCustomers,isLoading:"d-none"})); // get data from json and set on state
        // fetch('/getdataEmployees')
        // .then(res => res.json())
        // .then(getDataEmployees => this.setState({getDataEmployees}));
        //console.log(this.state.getData)
      }

   changeStatus(key,status){
    const { isDisabled } = this.state;
    //change validation status by key
    let fieldValidation = Object.assign({}, this.state.fieldValidation)
    fieldValidation[key] = status;                     // update the name property, assign a new value                 
    this.setState({fieldValidation}) 
                
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
       console.log(fieldValidation)
      }

      validateFields(e){
       const { getDataCustomers, fieldValidation, newCustomer} = this.state;
       console.log("on start") 
       console.log(e.target.value.toUpperCase(),e.target.value.length, e.target.id )  
       console.log(fieldValidation) 
       console.log(getDataCustomers) 
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
                   let custName = getDataCustomers.find((cust) => { if(cust.WorkName==insertData) return cust}) //check if already exist customer with same WorkName
                   console.log("WorkName : " + custName, e.target.value.toUpperCase())   
                   if(custName!==undefined){
                       this.changeStatus(e.target.id,false)
                      break;}
                   
                   this.changeStatus(e.target.id,true)
                   e.target.value = insertData  // show in input in database format 
                   this.setState(prevState => {
                   let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                   newCustomer.WorkName = insertData;                     // update the name property, assign a new value                 
                   return { newCustomer };                                 // return new object fieldValidatione object
                   })
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
                this.setState(prevState => {
                    let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                    newCustomer.CRN = insertData;                     // update the name property, assign a new value                 
                    return { newCustomer };                                 // return new object fieldValidatione object
                    })
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
                  break;
           case "name1" :
                   if( insertData.length < 3 || !isNaN(insertData)){  // length between 2-5
                       this.changeStatus(e.target.id,false)
                       break;}
                   this.changeStatus(e.target.id,true)
                   insertData = insertData.toLowerCase()
                   insertData = insertData.charAt(0).toUpperCase() + insertData.slice(1);
                   e.target.value = insertData  // show in input in database format 
                   this.setState(prevState => {
                       let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                       newCustomer.ContactName = insertData;                     // update the name property, assign a new value                 
                       return { newCustomer };                                 // return new object fieldValidatione object
                       })
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
                break;
          case "name2" :
                    if( insertData.length < 3 || !isNaN(insertData)){  // length between 2-5
                        this.changeStatus(e.target.id,false)
                        break;}
                    this.changeStatus(e.target.id,true)
                    insertData = insertData.toLowerCase()
                    insertData = insertData.charAt(0).toUpperCase() + insertData.slice(1);
                    e.target.value = insertData  // show in input in database format 
                    this.setState(prevState => {
                        let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                        newCustomer.ContactName2 = insertData;                     // update the name property, assign a new value                 
                        return { newCustomer };                                 // return new object fieldValidatione object
                        })
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
                 break;
         case "city" :
                 if(insertData.length < 3 || insertData.length > 20  || !isNaN(insertData)){  // length between 2-5
                     this.changeStatus(e.target.id,false)
                     break;}
                 this.changeStatus(e.target.id,true)
                 insertData = insertData.toLowerCase()
                 insertData = insertData.charAt(0).toUpperCase() + insertData.slice(1);
                 e.target.value = insertData  // show in input in database format 
                 this.setState(prevState => {
                     let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                     newCustomer.City = insertData;                     // update the name property, assign a new value                 
                     return { newCustomer };                                 // return new object fieldValidatione object
                     })
                  break;
         case "country" :
                 if(insertData.length < 3 || insertData.length > 20  || !isNaN(insertData)){  // length between 2-5
                     this.changeStatus(e.target.id,false)
                     break;}
                 this.changeStatus(e.target.id,true)
                 insertData = insertData.toLowerCase()
                 insertData = insertData.charAt(0).toUpperCase() + insertData.slice(1);
                 e.target.value = insertData  // show in input in database format 
                 this.setState(prevState => {
                     let newCustomer = Object.assign({}, prevState.newCustomer);  // creating copy of state variable fieldValidatione
                     newCustomer.Country = insertData;                     // update the name property, assign a new value                 
                     return { newCustomer };                                 // return new object fieldValidatione object
                     })
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
                    
                 break;   
                   default :  console.log("default")  
       } 
       console.log(fieldValidation)
       console.log(insertData.length)
       console.log(e.target.id) 
       console.log(newCustomer) 
    
     }    
   
     validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
           }
        
     
     handleSubmit(){
        const { getDataCustomers, newCustomer} = this.state;
        let customer  = newCustomer
        let id = (parseInt(getDataCustomers[getDataCustomers.length-1].CustID) + 1 ).toString()
        let employeeId = this.props.activeUser.EmployeeId
        customer._id = id
        customer.CustID = id
        customer.EmployeeID = employeeId
        customer.CategoryID = "1"  // 
        customer.PtmDelay = "30" // const be default 
        // console.log(customer)
        // console.log(this.state.newCustomer)
        this.setState({newCustomer:customer})

        fetch('/insertNewCustomer',{ // send data to express server 
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
            name2: false,
            telephone2: false,
            email: false,
            city: false,
            country: false
        }
        this.setState({fieldValidation:fieldValidation})
     }
     render() {
        const {isLoading, redirectToHome, validated , fieldValidation, isDisabled, isSuccess} = this.state;
        // print this message after to get u success json from server 
        if (isSuccess) {
            return <Container>
                     <Row>
                         <Col> <h2 className="text-success text-center">Adding new customer was successfull</h2> </Col>
                     </Row>
                  </Container>
        }
        if (redirectToHome) {
            return <Redirect to="/dashboard"/>
        }
        if(isLoading == ""){
            return <Loading isLoading={isLoading} />
         }
        return(
              <Container> 
                  <Row>
                      <Col><h2 className="text-center"> Add new customer</h2></Col>
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
                       <Form.Group as={Col} md="8" controlId="address">
                         <Form.Label>Adrress</Form.Label>
                         <Form.Control type="text" placeholder="Adrress"  />
                         <Form.Control.Feedback type="invalid">
                           Please provide a Contact Name
                         </Form.Control.Feedback>
                       </Form.Group>
                   
                       <Form.Group as={Col} md="2" controlId="city" onChange={this.validateFields}>
                         <Form.Label>City</Form.Label>
                         <Form.Control type="text" placeholder="City" required 
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
                         <Form.Control type="text" placeholder="Country" required 
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
                                    <Button className="my-3 btn-block" variant="danger" type="reset" onClick={this.reset}>
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