import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal, Image} from 'react-bootstrap';
import Loading from './Loading';

export default class ShowProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: [],
            getDataProducts:[],
            selectedProduct: {},
            getProduct: {},
            redirectToHome: false,
            showModal: false,
            isLoading: "",
          
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.detailsModalWindow = this.detailsModalWindow.bind(this);
        
    }
    componentDidMount(){
        // fetch('/getdata')
        // .then(res => res.json())
        // .then(getData => this.setState({getData}));
        fetch('/getDataProducts')
        .then(res => res.json())
        .then(getDataProducts => this.setState({getDataProducts,isLoading:"d-none"}));
        
      }
         
    openModal(e) {
        const index = e.target.getAttribute('data-key')
        this.setState({ showModal: true })
        
      //  console.log( e.target.getAttribute('data-key'))
        console.log( this.state.getDataProducts[index-1].SuppId )
        this.setState({ selectedProduct: this.state.getDataProducts[index-1] })
        //const res = this.state.getDataProducts.find( (item) => {if (item.SuppId == this.state.getDataProducts[index-1].CategoryID) return item} ) //get all data of Employee that work with current customer
       //console.log( res.Name )
     //  this.setState({ getProduct: res })
      
    }
    
    closeModal() {
        this.setState({ showModal: false })
    }
    detailsModalWindow() {
       const {selectedProduct,getProduct } = this.state;
     //   selectedProduct.Agent = getProduct.Name // add property employee name to customer modal 
        let detailsKeys = Object.keys(selectedProduct) 
        let detailsValues = Object.values(selectedProduct)
        let result =[]
        for(let i=0;i<detailsKeys.length;i++){
            result[i]=
                        <tr>
                            <td>{detailsKeys[i]}</td>
                            <td>{detailsValues[i]}</td>
                        </tr>
       }
       
       console.log( getProduct.Name )
        // console.log(this.state.selectedProduct)
       return result
     }
      render() {
        const { isLoading, redirectToHome, getDataProducts , showModal, selectedProduct} = this.state;
       let image = "images/" + selectedProduct.ProductID + ".jpg"
       
        console.log(getDataProducts) 
        if (redirectToHome) {
            return <Redirect to="/"/>
        }
        if(isLoading == ""){
            return <Loading isLoading={isLoading} />
         }
         
        let count = 0 // row number in the table
        let Rows = getDataProducts.map(prod =>   // generate table with customers
            <tr data-key={++count} onClick={this.openModal}> 
                 <td data-key={count}>{count}</td>
                                <td data-key={count}>{prod.ProductID}</td>
                                <td data-key={count}>{prod.ProductName}</td>
                                <td data-key={count}>{prod.Description}</td>
                                <td data-key={count}>{prod.MinOrder + prod.Unit}</td>
                                <td data-key={count}>{prod.ListPrice}</td>
                                <td data-key={count}>{prod.CategoryID}</td>
                               
                                
             </tr>)
      // console.log( this.state.getData[0].City )
      // console.log(selectedProduct.City ) 
      //  console.log( Object.keys(selectedProduct) ) 
        return(
              <Container> <h2> All Products List</h2>
                        
                        <Table responsive="lg">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>ProductId</th>
                                <th>ProductName</th>
                                <th>Description</th>
                                <th>MinOrder</th>
                                <th>ListPrice</th>
                                <th>Category</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Rows}
                            </tbody>
                        </Table>

                        <Modal show={showModal} onHide={this.closeModal} size="md" >  
                            <Modal.Header closeButton>
                                <Modal.Title>Product Details - {selectedProduct.ProductName}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                            <div class="text-center mb-2" >
                              <Image  src={image} width="300px" fluid/>
                             </div>
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