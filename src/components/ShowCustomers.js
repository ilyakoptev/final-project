import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button , Table} from 'react-bootstrap';
import customerorders from '../data/customerorders';

export default class MainWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: [],
            redirectToHome: false,
            customerorders: customerorders,
        }

        this.openCustomerDetails = this.openCustomerDetails.bind(this);
    }
    componentDidMount(){
        fetch('/getdata')
        .then(res => res.json())
        .then(getData => this.setState({getData}));
      
        //console.log(this.state.getData)
      }
      openCustomerDetails(){
          
      }
      render() {
        const { redirectToHome } = this.state;
        if (redirectToHome) {
            return <Redirect to="/"/>
        }
        let count = 1  
        let customerRows = this.state.getData.map(cust =>
            <tr onClick={this.openCustomerDetails}> 
                 <td>{count++}</td>
                                <td>{cust.CustID}</td>
                                <td>{cust.WorkName}</td>
                                <td>{cust.Company}</td>
                                <td>{cust.ContactName}</td>
                                <td>{cust.Email}</td>
                                <td>{cust.City}</td>
           
             </tr>)
        
        return(
              <Container> <h2> All Customers List</h2>
                        
                        <Table responsive="lg">
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
                            {customerRows}
                            </tbody>
                        </Table>
            </Container>
          )
      }
    }