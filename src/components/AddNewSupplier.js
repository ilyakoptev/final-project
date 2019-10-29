import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Row, Col, Form} from 'react-bootstrap';
import {supplier} from '../objects/supplier';
import Loading from './Loading';

export default class AddNewSupplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getDataSuppliers: [],
            getDataEmployees:[],
            newSupplier: new supplier(),
            getEmployee: {},
            redirectToHome: false,
            isDisabled: true,  // button Submit order status 
            validated: false,
            isSuccess: false,
            isLoading: "",
            fieldValidation:{ // insert all values as false for hiding submit button 
                SuppName:false,
                ContactName: false,
                Telephone:false,
                ContactName1: true,
                Telephone1: true,
                Address: true,
                Email: true,
               
            }
        }

        this.validateFields = this.validateFields.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
       // this.detailsModalWindow = this.detailsModalWindow.bind(this);
        
    }
    componentDidMount(){
        fetch('/getdataSuppliers')
        .then(res => res.json())
        .then(getDataSuppliers => this.setState({getDataSuppliers,isLoading:"d-none"}));
       
        // fetch('/getdataEmployees')
        // .then(res => res.json())
        // .then(getDataEmployees => this.setState({getDataEmployees}));
        //console.log(this.state.getData)
      }
   changeStatus(key,status){
        const { isDisabled } = this.state;
        // change validation status 
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
       console.log(submit , isDisabled ) 
       console.log(fieldValidation)
      //   this.setState({workName:"valid"})
      //  alert(this.state.fieldValidation.workName)
      }


      validateFields(e){
       const { getDataSuppliers, fieldValidation, newSupplier} = this.state;
       console.log("on start") 
       console.log(e.target.value.toUpperCase(),e.target.value.length, e.target.id )  
       console.log(fieldValidation) 
       console.log(getDataSuppliers) 
       console.log(newSupplier) 
       console.log("****************") 
       var insertData = e.target.value
        // // copy object
                            // let fieldValidation = Object.assign({}, this.state.fieldValidation);
                            // fieldValidation[e.target.id] = false;
                            // this.setState({fieldValidation});
      
       switch (e.target.id){
           case "SuppName" :  
                        if( insertData.length < 3 || !isNaN(insertData)){  // 
                             this.changeStatus(e.target.id,false)
                             break;}
                        insertData = insertData.toUpperCase() 
                        let SuppName = getDataSuppliers.find((supp) => { if(supp.SuppName.toUpperCase()==insertData) return supp}) //check if already exist customer with same WorkName
                        console.log("SuppName : " + SuppName, e.target.value.toUpperCase())   
                        if(SuppName!==undefined){
                              this.changeStatus(e.target.id,false)
                              break;}
                        insertData = insertData.toLowerCase()
                        insertData = insertData.charAt(0).toUpperCase() + insertData.slice(1);
                        e.target.value = insertData  // show in input in database format 
                        this.changeStatus(e.target.id,true)
                       // e.target.value = insertData  // show in input in database format 
                        this.setState(prevState => {
                        let newSupplier = Object.assign({}, prevState.newSupplier);  // creating copy of state variable fieldValidatione
                        newSupplier.SuppName = insertData;                     // update the name property, assign a new value                 
                        return { newSupplier };                                 // return new object fieldValidatione object
                        })
                   
                   console.log(fieldValidation)
                   console.log(insertData.length)
                   console.log(e.target.id) 
                   console.log(newSupplier) 
                   break ;
           case "Address" :
                if(insertData.length < 7 || insertData.length > 13  || isNaN(insertData)){  // length between 2-5
                    this.changeStatus(e.target.id,false)
                    break;}
                this.changeStatus(e.target.id,true)
                this.setState(prevState => {
                    let newSupplier = Object.assign({}, prevState.newSupplier);  // creating copy of state variable fieldValidatione
                    newSupplier.Address = insertData;                     // update the name property, assign a new value                 
                    return { newSupplier };                                 // return new object fieldValidatione object
                    })
                    console.log(fieldValidation)
                   console.log(insertData.length)
                   console.log(e.target.id) 
                   console.log(newSupplier) 
                break;
           case "ContactName" :
                   if( insertData.length < 3 || !isNaN(insertData)){  // length between 2-5
                       this.changeStatus(e.target.id,false)
                       break;}
                   this.changeStatus(e.target.id,true)
                   insertData = insertData.toLowerCase()
                   insertData = insertData.charAt(0).toUpperCase() + insertData.slice(1);
                   e.target.value = insertData  // show in input in database format 
                   this.setState(prevState => {
                       let newSupplier = Object.assign({}, prevState.newSupplier);  // creating copy of state variable fieldValidatione
                       newSupplier.ContactName = insertData;                     // update the name property, assign a new value                 
                       return { newSupplier };                                 // return new object fieldValidatione object
                       })
                      console.log(fieldValidation)
                      console.log(insertData.length)
                      console.log(e.target.id) 
                      console.log(newSupplier) 
                   break;     
          case "Telephone" :
               if(insertData.length < 7 || insertData.length > 13  || isNaN(insertData)){  // length between 2-5
                   this.changeStatus(e.target.id,false)
                   break;}
               this.changeStatus(e.target.id,true)
               this.setState(prevState => {
                   let newSupplier = Object.assign({}, prevState.newSupplier);  // creating copy of state variable fieldValidatione
                   newSupplier.Telephone = insertData;                     // update the name property, assign a new value                 
                   return { newSupplier };                                 // return new object fieldValidatione object
                   })
                   console.log(fieldValidation)
                  console.log(insertData.length)
                  console.log(e.target.id) 
                  console.log(newSupplier) 
               break;
      case "ContactName1" :
                if( insertData.length < 3 || !isNaN(insertData)){  // length between 2-5
                    this.changeStatus(e.target.id,false)
                    break;}
                this.changeStatus(e.target.id,true)
                insertData = insertData.toLowerCase()
                insertData = insertData.charAt(0).toUpperCase() + insertData.slice(1);
                e.target.value = insertData  // show in input in database format 
                this.setState(prevState => {
                    let newSupplier = Object.assign({}, prevState.newSupplier);  // creating copy of state variable fieldValidatione
                    newSupplier.ContactName1 = insertData;                     // update the name property, assign a new value                 
                    return { newSupplier };                                 // return new object fieldValidatione object
                    })
                   console.log(fieldValidation)
                   console.log(insertData.length)
                   console.log(e.target.id) 
                   console.log(newSupplier) 
                break;    
        case "Telephone1" :
                    if(insertData.length < 10 || insertData.length > 13  || isNaN(insertData)){  // length between 2-5
                        this.changeStatus(e.target.id,false)
                        break;}
                    this.changeStatus(e.target.id,true)
                    this.setState(prevState => {
                        let newSupplier = Object.assign({}, prevState.newSupplier);  // creating copy of state variable fieldValidatione
                        newSupplier.Telephone1 = insertData;                     // update the name property, assign a new value                 
                        return { newSupplier };                                 // return new object fieldValidatione object
                        })
                        console.log(fieldValidation)
                       console.log(insertData.length)
                       console.log(e.target.id) 
                       console.log(newSupplier) 
                    break;
       
        
         case "Email" :
                console.log("Email") 
                 console.log(this.validateEmail(insertData)) 
                 console.log("********") 
                 if(!this.validateEmail(insertData)){  // length between 2-5
                     this.changeStatus(e.target.id,false)
                     break;}
                 this.changeStatus(e.target.id,true)
                 this.setState(prevState => {
                     let newSupplier = Object.assign({}, prevState.newSupplier);  // creating copy of state variable fieldValidatione
                     newSupplier.Email = insertData;                     // update the name property, assign a new value                 
                     return { newSupplier };                                 // return new object fieldValidatione object
                     })
                    console.log(fieldValidation)
                    console.log(insertData.length)
                    console.log(e.target.id) 
                    console.log(newSupplier) 
                 break;   
                   default :  console.log("default")  ///^[^\s@]+@[^\s@]+\.[^\s@]+$/
       } 

    
     }    
   
     validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
           }
        
     
     handleSubmit(){
        const { getDataSuppliers, newSupplier} = this.state;
        let supplier  = newSupplier
        let id = (parseInt(getDataSuppliers[getDataSuppliers.length-1].SuppId) + 1 ).toString()
        supplier._id = id
        supplier.SuppId = id
        supplier.CategoryID = "1" // change to insert category from user 
        supplier.PtmDelay = "60" // const be default 
        console.log(supplier)
        console.log(this.state.newSupplier)
        this.setState({newSupplier:supplier})

        fetch('/insertNewSupplier',{ // send data to express server 
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(supplier),
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
       let fieldValidation = { // insert all values as false for hiding submit button 
        SuppName:false,
        ContactName: false,
        Telephone:false,
        ContactName1: true,
        Telephone1: true,
        Address: true,
        Email: true,
     }
       this.setState({fieldValidation})
     }
     render() {
        const {isLoading, redirectToHome, validated , fieldValidation, isDisabled, isSuccess} = this.state;
        // print this message after to get u success json from server 
        if (isSuccess) {
            return <Container>
                     <Row>
                         <Col> <h2 className="text-success text-center">Adding new supplier was successfull</h2> </Col>
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
                      <Col><h2 className="text-center"> Add new supplier</h2></Col>
                  </Row>
               <Row>
                 <Col>
                 <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                  
                     <Form.Row>
                       <Form.Group as={Col} md="4" controlId="SuppName" onChange={this.validateFields} >
                         <Form.Label >Supplier Name</Form.Label>
                         <Form.Control
                        //    required
                           type="text"
                           placeholder="Supplier Name"
                           isValid={fieldValidation.SuppName}
                           isInvalid={!fieldValidation.SuppName}
                         />
                         <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                           Please provide a valid Supplier Name.
                         </Form.Control.Feedback>
                        </Form.Group>

                         <Form.Group as={Col} md="8" controlId="Address">
                           <Form.Label>Address</Form.Label>
                           <Form.Control type="text" placeholder="Address"  />
                           <Form.Control.Feedback type="invalid">
                             Please provide valid Address
                           </Form.Control.Feedback>
                        </Form.Group>
                      
                    
                     </Form.Row>
                  
                  
                     <Form.Row>
                     <Form.Group as={Col} md="3" controlId="ContactName" onChange={this.validateFields}>
                         <Form.Label>Contact Name</Form.Label>
                         <Form.Control
                           required
                           type="text"
                           placeholder="ContactName"
                           isValid={fieldValidation.ContactName}
                           isInvalid={!fieldValidation.ContactName}                         
                         />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a valid Contact Name.
                         </Form.Control.Feedback>
                       </Form.Group>

                       <Form.Group as={Col} md="3" controlId="Telephone" onChange={this.validateFields}>
                         <Form.Label>Telephone</Form.Label>
                           <Form.Control
                             type="text"
                             placeholder="Telephone"
                             required
                             isValid={fieldValidation.Telephone}
                             isInvalid={!fieldValidation.Telephone}
                           />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                           <Form.Control.Feedback type="invalid">
                           Please provide a valid Telephone.
                           </Form.Control.Feedback>
                        </Form.Group>
                   
                       <Form.Group as={Col} md="3" controlId="ContactName1" onChange={this.validateFields}>
                         <Form.Label>Contact Name 2</Form.Label>
                         <Form.Control type="text" placeholder="ContactName1"  />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a Contact Name
                         </Form.Control.Feedback>
                       </Form.Group>
                   
                       <Form.Group as={Col} md="3" controlId="Telephone1" onChange={this.validateFields}>
                         <Form.Label>Telephone 2</Form.Label>
                         <Form.Control type="text" placeholder="Telephone1"  />
                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type="invalid">
                           Please provide a valid Telephone number.
                         </Form.Control.Feedback>
                       </Form.Group>
                      </Form.Row>

                    
                      <Form.Row>
                      <Form.Group as={Col} md="12" controlId="Email" onChange={this.validateFields}>
                         <Form.Label>E-mail</Form.Label>
                         <Form.Control type="Email" placeholder="Email" />
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
                                        <h5>Insert New Supplier </h5>
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