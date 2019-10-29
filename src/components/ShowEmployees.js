import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal} from 'react-bootstrap';
import Loading from './Loading';

export default class ShowEmployees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getDataEmployees:[],
            selectedSupplier: {},
            redirectToHome: false,
            showModal: false,
            isLoading: "",
        }

        //this.openCustomerDetails = this.openCustomerDetails.bind(this);
       // this.openModal = this.openModal.bind(this);
       // this.closeModal = this.closeModal.bind(this);
       // this.detailsModalWindow = this.detailsModalWindow.bind(this);
        
    }
    componentDidMount(){
         fetch('/getdataEmployees')
        .then(res => res.json())
        .then(getDataEmployees => this.setState({getDataEmployees,isLoading:"d-none"}));
      }
         
    // openModal(e) {
    //     const index = e.target.getAttribute('data-key')
    //     this.setState({ showModal: true })
        
    //   //  console.log( e.target.getAttribute('data-key'))
    //     console.log( this.state.getDataSuppliers[index-1].SuppId )
    //     this.setState({ selectedSupplier: this.state.getDataSuppliers[index-1] })
     
      
    // }
    
    // closeModal() {
    //     this.setState({ showModal: false })
    // }
    // detailsModalWindow() {
    //    const {selectedSupplier} = this.state;
    //  //   selectedSupplier.Agent = getSupplier.Name // add property employee name to customer modal 
    //     let detailsKeys = Object.keys(selectedSupplier) 
    //     let detailsValues = Object.values(selectedSupplier)
    //     let result =[]
    //     for(let i=0;i<detailsKeys.length;i++){
    //         result[i]=
    //                     <tr>
    //                         <td>{detailsKeys[i]}</td>
    //                         <td>{detailsValues[i]}</td>
    //                     </tr>
    //    }
    //   return result
    //  }
  
  
  
     render() {
        const { isLoading, redirectToHome, getDataEmployees , showModal, selectedSupplier} = this.state;
        console.log(getDataEmployees) 
        if (redirectToHome) {
            return <Redirect to="/"/>
        }
        if(isLoading == ""){
            return <Loading isLoading={isLoading} />
         }
        let count = 0 // row number in the table
        let Rows = getDataEmployees.map(emp =>   // generate table with customers
            <tr data-key={++count} onClick={this.openModal}> 
                                <td data-key={count}>{emp.EmployeeId}</td>
                                <td data-key={count}>{emp.Name}</td>
                                <td data-key={count}>{emp.JobTitle}</td>
                                <td data-key={count}>{emp.Telephone}</td>
                                <td data-key={count}>{emp.Email}</td>
                                {/* <td data-key={count}>{emp.Password}</td> */}
                               
                                
             </tr>)
      // console.log( this.state.getData[0].City )
      // console.log(selectedSupplier.City ) 
      //  console.log( Object.keys(selectedSupplier) ) 
        return(
              <Container> <h2> Employees List</h2>
                        
                        <Table responsive="lg">
                            <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name </th>
                                <th>Position</th>
                                <th>Telephone</th>
                                <th>E-Mail</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Rows}
                            </tbody>
                        </Table>
{/* 
                        <Modal show={showModal} onHide={this.closeModal} size="">  
                            <Modal.Header closeButton>
                                <Modal.Title>Supplier Details - {selectedSupplier.SuppName}</Modal.Title>
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
                </Modal> */}

            </Container>
          )
      }
    }