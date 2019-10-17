import React from 'react'
import { Jumbotron, Button, Container, Form, Modal, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
//import RecipeNavbar from '../components/RecipeNavbar';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            invalidLogin: false,
            successLogin: false,
            inputName: null,
            inputPassword: null,
            getDataEmployees: [],
            getEmployee: {},

        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.login = this.login.bind(this);
        this.getInputName = this.getInputName.bind(this);
        this.getInputPassword = this.getInputPassword.bind(this);
    }

    componentDidMount() {
        fetch('/getdataEmployees')
            .then(res => res.json())
            .then(getDataEmployees => this.setState({ getDataEmployees }));
        //console.log(this.state.getDataEmployees)
    }

    openModal() {
        this.setState({ showModal: true })
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    getInputName(e) {
        this.setState({ inputName: e.target.value })
    }
    getInputPassword(e) {
        this.setState({ inputPassword: e.target.value })
    }

    login() {
        const { employees } = this.props;
        const { inputName, inputPassword, getDataEmployees } = this.state;
        // console.log(inputName,inputPassword);
        console.log(inputName, inputPassword); //[0] - kind of data base struction - all data in [0] item
        console.log(getDataEmployees.length, getDataEmployees[0].Name, getDataEmployees[0].Password);
        for (let i = 0; i < getDataEmployees.length; i++) {
            //console.log(i,getDataEmployees[i].Name, getDataEmployees[i].Password);
            if (inputName === getDataEmployees[i].Name && inputPassword === getDataEmployees[i].Password) {
                this.closeModal();
                this.setState({ successLogin: true })
                this.props.handleLogin(getDataEmployees[i])
                    // console.log(employees[0].data[i])

            } else
                this.setState({ invalidLogin: true })
        }
    }
    render() {

        if (this.state.successLogin) {
            return <Redirect to = "/dashboard" / >
        }


        const { activeUser, customers } = this.props;
        const { showModal } = this.state;

        return ( < div >

            <
            Jumbotron >
            <
            Container >
            <
            h1 className = "display-3" > Accounting Programm < /h1> <p> Make your office more efficient </p >
            <
            p > < Button variant = "info"
            onClick = { this.openModal } > Login < /Button>  <
            /p>  <
            /Container>  <
            /Jumbotron>

            <
            Modal show = { showModal }
            onHide = { this.closeModal }
            size = "" >
            <
            Modal.Header closeButton >
            <
            Modal.Title > Please enter Name and password < /Modal.Title>  <
            /Modal.Header>  <
            Modal.Body >
            <
            Alert variant = "danger"
            show = { this.state.invalidLogin } >
            Invalid email or password!
            <
            /Alert>  <
            Form >
            <
            Form.Group controlId = "formBasicEmail" >
            <
            Form.Label > Email address < /Form.Label> <
            Form.Control type = "text"
            placeholder = "Enter your name"
            onBlur = { this.getInputName }
            />  <
            Form.Text className = "text-muted" >
            Please enter your name that you get from main office <
            /Form.Text> </Form.Group >

            <
            Form.Group controlId = "formBasicPassword" >
            <
            Form.Label > Password < /Form.Label>  <
            Form.Control type = "password"
            placeholder = "Password"
            onBlur = { this.getInputPassword }
            />  <
            /Form.Group>

            <
            /Form> </Modal.Body >

            <
            Modal.Footer >
            <
            Button variant = "info"
            type = "button"
            onClick = { this.login } > Login < /Button>  <
            Button variant = "secondary"
            onClick = { this.closeModal } > Close < /Button> <
            /Modal.Footer>    </Modal >

            <
            /div>
        );
    }
}

export default HomePage;