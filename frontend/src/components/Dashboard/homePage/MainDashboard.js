import React, { Component } from 'react';
import { getJWT } from '../../../utils/jwthelper';


import styled from 'styled-components';

//Main Dashboard Components:
import MDTodo from './MDTodo';
import MDSciNews from './MDSciNews';

//Styles:
const MainDashboardContainer = styled.div`
    height: 100vh;
    background-color: ##F6F9FC;
`
const MainDashboardHeaderContainer = styled.div`
    padding-top: 20px;
    text-align: center;
    background-color: ##F6F9FC;
`
const MainDashboardHeader = styled.h1`
    font-family: 'Nunito', sans-serif;
    margin: 0;
`
const MainDashboardHeader2 = styled.h2`
    font-family: 'Nunito', sans-serif;
    padding-top: 10px;
    margin: 0;
`

const MainDashboardUpperGrid = styled.div`
    background-color: ##F6F9FC;
    padding: 20px 20px;
    display: grid;
    grid-template-columns: 35% 65%;
`

const UpperGridContainer = styled.div`
    text-align: center;
    padding: 20px 40px;
`

class MainDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        const userDetails = getJWT();

        const { firstName, lastName, userName, email } = userDetails.data;

        this.setState({
            firstName,
            lastName,
            userName,
            email,
        });

        console.log(getJWT());
    }


    render() {

        const { firstName, email } = this.state;

        return (
            <MainDashboardContainer>
                <MainDashboardHeaderContainer>
                    <MainDashboardHeader>Welcome back {firstName}! </MainDashboardHeader>
                    <MainDashboardHeader2>You are currently signed in under {email}</MainDashboardHeader2>
                </MainDashboardHeaderContainer>
                <MainDashboardUpperGrid>
                    <UpperGridContainer>
                        <MDTodo />
                    </UpperGridContainer>
                    <UpperGridContainer>
                        <MDSciNews />
                    </UpperGridContainer>
                </MainDashboardUpperGrid>
            </MainDashboardContainer>
        )
    }
}

/*
Notes:

I have finally gotten the backend and the frontend to render via heroku and netlify, respectively. However, there seems to be an issue that comes back to bite me. It appears that my reliance on redux-persist has failed now that I'm loading everything completing from scratch. The since in my useEffect() hook I am calling the API for information, the state does not exist when the component is rendered, leading to a blank page. This is very problematic.

I'll have to look into this, but the first solution that comes to mind is having a loading page with a spinner that basically just calls ALL of the information stored in the DB for the particular user and sends it off to the reducer...

*/

export default MainDashboard;