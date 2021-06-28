import React, { Component } from 'react';
import { getJWT } from '../../utils/jwthelper';
import history from '../../historyObject';

class AuthenticatedComponents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
        };
    }

    componentDidMount() {
        // Use helper function to grab JWT from localstorage.
        const jwt = getJWT();

        //If there's no JWT present in the localstorage, no JWT must be sent over from server, meaning that login is wrong. Push the user back to the login page.
        if (
            !jwt ||
            (Object.keys(jwt).length === 0 && jwt.constructor === Object)
        ) {
            console.log(jwt);
            history.push('/login');
        }

        //If the user's JWT is present: set the React state to 'temp' instead of undefined.
        this.setState({
            user: 'temp',
        });
    }

    render() {
        //If the react state is undefined, return a small statement. Else, return the app dashboard.

        if (this.state.user === undefined) {
            return (
                <div>
                    <h1>
                        The route you are accessing is protected. Please log in.
                    </h1>
                </div>
            );
        }

        return <>{this.props.children}</>;
    }
}

export default AuthenticatedComponents;
