import React, { Component } from 'react';
import { getJWT } from '../../utils/jwthelper';
import history from '../../historyObject';
// import api from '../../api';

class AuthenticatedComponents extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
        }
    }

    componentDidMount() {
        const jwt = getJWT();

        if(!jwt) {
            history.push('/login');
        }
        //Implement route in server for using JWT to get user, store something temporarily for now:
        this.setState({
            user: 'temp'
        });

    }


    render() {

        if (this.state.user === undefined) {
            return (
                <div><h1>The route you are accessing is protected. Please log in.</h1></div>
            );
        }

        return (
            <>
                {this.props.children}
            </>
        )
    }
}

export default AuthenticatedComponents;