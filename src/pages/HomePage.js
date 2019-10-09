import React from 'react'
import {Jumbotron, Button, Container,Form, Modal, Alert} from 'react-bootstrap'

//import RecipeNavbar from '../components/RecipeNavbar';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            invalidLogin: false,

        }
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.login = this.login.bind(this);
    }


     openModal() {
        this.setState({ showModal: true })
    }

    closeModal() {
        this.setState({ showModal: false })
    }
    
    login(){
        const {employees} = this.props;
        console.log(employees);

    }
    render() {
        const { activeUser, customers } = this.props;
        const {showModal} = this.state;

        return (
            <div>
               
                <Jumbotron>
                    <Container>
                        <h1 className="display-3">Accounting Programm</h1>
                        <p>Make your office more efficient</p>
                        <p>
                            <Button variant="info" onClick={this.openModal}>Login</Button>
                        </p>
                    </Container>
                </Jumbotron>
                
                <Modal show={showModal} onHide={this.closeModal} size="">
                    <Modal.Header closeButton>
                        <Modal.Title>Please enter Name and password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Alert variant="danger" show={this.state.invalidLogin}>
                    Invalid email or password!
                </Alert>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name"/>
                        <Form.Text className="text-muted">
                            Please enter your name that you get from main office
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control  type="password" placeholder="Password"/>
                    </Form.Group>
                    
                </Form>
                    </Modal.Body>
                
                        <Modal.Footer>
                          <Button variant="info" type="button"  onClick={this.login}>
                           Login
                         </Button>
                         <Button variant="secondary" onClick={this.closeModal}>
                            Close
                         </Button>
                        </Modal.Footer>   
                </Modal>

            </div>
        );
    }
}

export default HomePage;