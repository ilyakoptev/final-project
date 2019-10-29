import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal} from 'react-bootstrap';
import Loading from './Loading';

export default class ShowSuppliers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getDataSuppliers:[],
            selectedSupplier: {},
            redirectToHome: false,
            showModal: false,
            isLoading: "",
        }

        //this.openCustomerDetails = this.openCustomerDetails.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.detailsModalWindow = this.detailsModalWindow.bind(this);
        
    }
    componentDidMount(){
         fetch('/getdataSuppliers')
        .then(res => res.json())
        .then(getDataSuppliers => this.setState({getDataSuppliers,isLoading:"d-none"}));
      }
         
    openModal(e) {
        const index = e.target.getAttribute('data-key')
        this.setState({ showModal: true })
        
      //  console.log( e.target.getAttribute('data-key'))
        console.log( this.state.getDataSuppliers[index-1].SuppId )
        this.setState({ selectedSupplier: this.state.getDataSuppliers[index-1] })
     
      
    }
    
    closeModal() {
        this.setState({ showModal: false })
    }
    detailsModalWindow() {
       const {selectedSupplier} = this.state;
     //   selectedSupplier.Agent = getSupplier.Name // add property employee name to customer modal 
        let detailsKeys = Object.keys(selectedSupplier) 
        let detailsValues = Object.values(selectedSupplier)
        let result =[]
        for(let i=0;i<detailsKeys.length;i++){
            result[i]=
                        <tr>
                            <td>{detailsKeys[i]}</td>
                            <td>{detailsValues[i]}</td>
                        </tr>
       }
      return result
     }
  
  
  
     render() {
        const { isLoading, redirectToHome, getDataSuppliers , showModal, selectedSupplier} = this.state;
        console.log(getDataSuppliers) 
        if (redirectToHome) {
            return <Redirect to="/"/>
        }
        if(isLoading == ""){
            return <Loading isLoading={isLoading} />
         }
        let count = 0 // row number in the table
        let Rows = getDataSuppliers.map(supp =>   // generate table with customers
            <tr data-key={++count} onClick={this.openModal}> 
                 <td data-key={count}>{count}</td>
                                <td data-key={count}>{supp.SuppId}</td>
                                <td data-key={count}>{supp.SuppName}</td>
                                <td data-key={count}>{supp.ContactName}</td>
                                <td data-key={count}>{supp.Telephone}</td>
                                <td data-key={count}>{supp.Email}</td>
                               
                                
             </tr>)
      // console.log( this.state.getData[0].City )
      // console.log(selectedSupplier.City ) 
      //  console.log( Object.keys(selectedSupplier) ) 
        return(
              <Container> <h2> All Supplier List</h2>
                        
                        <Table responsive="lg">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>SuppID</th>
                                <th>Supp Name</th>
                                <th>Contact Name</th>
                                <th>Telephone</th>
                                <th>E-Mail</th>
                                
                            </tr>
                            </thead>
                            <tbody>
                            {Rows}
                            </tbody>
                        </Table>

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
                </Modal>

            </Container>
          )
      }
    }