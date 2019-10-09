import React from 'react'
import MainNavbar from '../components/MainNavbar'
import MainWindow from '../components/MainWindow'
import { Container, Row, Col, Button, Modal, Form, Image } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import customers from '../data/customers'
import customerorders from '../data/customerorders'
//import RecipeCard from '../components/RecipeCard'


class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            newRecipeImg: {
                file: null,
                URL: ""
            }
        }

        // this.openModal = this.openModal.bind(this);
        // this.closeModal = this.closeModal.bind(this);
        // this.createRecipe = this.createRecipe.bind(this);
        // this.imgChange = this.imgChange.bind(this);


    }


    // openModal() {
    //     this.setState({ showModal: true })
    // }

    // closeModal() {
    //     this.setState({ showModal: false })
    // }

    
    render() {
        const {activeUser,handleLogout, employees} = this.props;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        // const recipesCards = recipes.map(recipe => <Col key={recipe.id} lg="3" md="6"><RecipeCard recipe={recipe} /></Col>)

        return (
            
               
               <Container>
                  <MainNavbar activeUser={activeUser}  employees={employees} handleLogout={handleLogout} />
                
                  <MainWindow activeUser={activeUser} employees={employees}/>
                   


                    {/* 
                <Modal show={showModal} onHide={this.closeModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>New Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    Name
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control ref={this.nameInput} type="text" placeholder="Recipe name" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    Description
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control ref={this.descInput} type="text" placeholder="Recipe description" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    Image
                                </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type="file" placeholder="Recipe image URL" accept="image/*" onChange={this.imgChange}/>
                                </Col>
                                <Col sm={4}>
                                    <Image src={newRecipeImg.URL} fluid/>
                                </Col>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.createRecipe}>
                            Create Recipe
                        </Button>
                    </Modal.Footer>
                </Modal> */}

            
        
                </Container>

               
          )  }
}

export default DashBoard;