import React from 'react'
import { Redirect } from 'react-router-dom'
import customerorders from '../data/customerorders';

class MainWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: [],
            redirectToHome: false,
            customerorders: customerorders,
        }

        //this.logout = this.logout.bind(this);
    }
    componentDidMount(){
        fetch('/getdata')
        .then(res => res.json())
        .then(getData => this.setState({getData}));
      
        //console.log(this.state.getData)
      }
    
    // // this function in onvoked after every render (but not the first)
    // componentDidUpdate() {
    //     if (this.state.redirectToHome) {
    //         this.setState({redirectToHome: false})
    //     }
    // }

    

    render() {
        const { activeUser, employees, menuChoose } = this.props;
        const { redirectToHome } = this.state;

        if (redirectToHome) {
            return <Redirect to="/"/>
        }
        //console.log(employees)
        const currectUser = employees[0].data.find( (item)=> {if (item.EmployeeId == activeUser) return item.Name} ) //get all data of currect user 
        //console.log(customerorders)
        if(menuChoose==="createNewCustOrder"){
          return(
            <div>Create New Order</div>
          ) 
        }

        else{
            return (
                <div>
                  <h1>Users</h1>
                        <ul>
                          {this.state.getData.map(data =>
                           <li key={data.CustID}>{data.WorkName}</li>)}
                        </ul>
       
       
                   
                </div>

             ) }
    }
}

export default MainWindow;