import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal, Row, Col, InputGroup, Form, FormControl} from 'react-bootstrap';
import customerorders from '../data/customerorders';

export default class ShowCustomers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: [],
            getDataEmployees:[],
            selectedCustomer: {},
            getEmployee: {},
            redirectToHome: false,
            customerorders: customerorders,
            showModal: false,
            customerRowNum: null, 
            filterCustomers: "",
        }

        //this.openCustomerDetails = this.openCustomerDetails.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.detailsModalWindow = this.detailsModalWindow.bind(this);
        this.getFilterText = this.getFilterText.bind(this);
        this.sortBy = this.sortBy.bind(this);
        
        
    }
    componentDidMount(){
        fetch('/getdataCustomers') // get promise
        .then(res => res.json())  //get json 
        .then(getData => this.setState({getData})); // get data from json and set on state
        fetch('/getdataEmployees')
        .then(res => res.json())
        .then(getDataEmployees => this.setState({getDataEmployees}));
        //console.log(this.state.getData)
      }
    
    getFilterText(e){
       this.setState({filterCustomers:e.target.value})
      }

    sortBy(e){

      }

    openModal(e) {
        const index = e.target.getAttribute('data-key')
        this.setState({ showModal: true })
        this.setState({ customerRowNum:index })
      //  console.log( e.target.getAttribute('data-key'))
        console.log( this.state.getData[index-1].WorkName )
        this.setState({ selectedCustomer: this.state.getData[index-1] })
        const res = this.state.getDataEmployees.find( (item) => {if (item.EmployeeId == this.state.getData[index-1].EmployeeID) return item} ) //get all data of Employee that work with current customer
       //console.log( res.Name )
       this.setState({ getEmployee: res })
     }
    
    closeModal() {
        this.setState({ showModal: false })
    }

    detailsModalWindow() {
        const {selectedCustomer,getEmployee } = this.state;
        selectedCustomer.Agent = getEmployee.Name // add property employee name to customer modal 
        let detailsKeys = Object.keys(selectedCustomer) 
        let detailsValues = Object.values(selectedCustomer)
        let result =[]
        for(let i=0;i<detailsKeys.length;i++){
            result[i]=
                        <tr>
                            <td>{detailsKeys[i]}</td>
                            <td>{detailsValues[i]}</td>
                        </tr>
       }
       
      // console.log( result)
        // console.log(this.state.selectedCustomer)
       return result
     }

      customerTable(filter){
        const { getData,filterCustomers } = this.state;
        let count = 0 // row number in the table
       
        let filteredData =[]
        for (let i=0;i<getData.length;i++) {
           let fullName = getData[i].WorkName + getData[i].Company // get full name in one string
           if (fullName.toLowerCase().includes(filter.toLowerCase()) ){ // fullname and filter to lowCase to find all names 
               filteredData = filteredData.concat(getData[i])
                }        
        }
        let customerRows = filteredData.map(cust =>   // generate table with customers
            <tr data-key={++count} onClick={this.openModal}> 
                 <td data-key={count}>{count}</td>
                                <td data-key={count}>{cust.CustID}</td>
                                <td data-key={count}>{cust.WorkName}</td>
                                <td data-key={count}>{cust.Company}</td>
                                <td data-key={count}>{cust.ContactName}</td>
                                <td data-key={count}>{cust.Email}</td>
                                <td data-key={count}>{cust.City}</td> 
                                
             </tr>)
        console.log("filterCustomers: " + filterCustomers)
        return  customerRows  
      }
    
      render() {
        const { redirectToHome, getData , showModal, selectedCustomer} = this.state;
       
        if (redirectToHome) {
            return <Redirect to="/"/>
        }
       
      // console.log( this.state.getData[0].City )
      // console.log(selectedCustomer.City ) 
      //  console.log( Object.keys(selectedCustomer) ) 
        return(
              <Container> 
                    <Row className="justify-content-md-center">
                    <h2> Customers </h2>
                        <Col lg={12} xl={10}>
                         <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                   <InputGroup.Text id="inputGroup-sizing-sm">Filter by:</InputGroup.Text>
                           </InputGroup.Prepend>
                           <FormControl onChange={this.getFilterText} aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="WorkName or Company"/>
                           <InputGroup.Prepend>
                                   <InputGroup.Text id="inputGroup-sizing-sm">Sort By:</InputGroup.Text>
                           </InputGroup.Prepend>
                           <Form.Control as="select" onChange={this.sortBy}>
                                    <option value="">Choose...</option>
                                    <option value="WorkName">WorkName</option>
                                    <option value="Company">Company</option>
                                    <option value="City">City</option>
                                    </Form.Control>
                         </InputGroup>
                        </Col>
                    </Row>   
                    <Row className="justify-content-md-center"> 
                        <Table responsive="lg" >
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>CustID</th>
                                <th>WorkName</th>
                                <th>Company</th>
                                <th>ContactName</th>
                                <th>E-Mail</th>
                                <th>Location</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.customerTable(this.state.filterCustomers)}
                            </tbody>
                        </Table>
                      </Row>   
                        <Modal show={showModal} onHide={this.closeModal} size="">  
                            <Modal.Header closeButton>
                                <Modal.Title>Customer Details - {selectedCustomer.WorkName}</Modal.Title>
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
                            Close
                         </Button>
                        </Modal.Footer>   
                </Modal>

            </Container>
          )
      }
    }