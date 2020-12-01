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

export default MainDashboard;