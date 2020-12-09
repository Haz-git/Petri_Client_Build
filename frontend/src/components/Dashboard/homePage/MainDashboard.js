import React, { Component } from 'react';
import { getJWT } from '../../../utils/jwthelper';
import { connect } from 'react-redux';
import defaultAvatar from '../../../Img/default_avatar.png';
import { userGetProfilePicture } from '../../../redux/userSettings/UserSettingActions';
import Fade from 'react-reveal/Fade';


import styled from 'styled-components';

//Main Dashboard Components:
import MDTodo from './MDTodo';
import MDSciNews from './MDSciNews';

//Styles:
const MainDashboardContainer = styled.div`
    height: 100vh;
    background-color: #F6F9FC;
`
const MainDashboardHeaderContainer = styled.div`
    padding-left: 40px;
    display: flex;
    text-align: center;
    background-color: #1c1e37;
    height: 85px;
    border-left: 1px solid #F6F9FC;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
`
const MainDashboardUserNameHeader = styled.h1`
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    font-size: 25px;
    font-weight: 500;
    color: #F6F9FC;
    display: flex;
    justify-content: flex-start;
    padding-left: 15px;
    padding-bottom: 0px;
    padding-top: 10px;
`

const MainDashboardHeader = styled.h2`
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    font-size: 16px;
    font-weight: 100;
    color: #F6F9FC;
    display: flex;
    justify-content: flex-start;
    padding-left: 15px;
    padding-bottom: 0px;
`
const MainDashboardHeader2 = styled.h2`
    font-family: 'Montserrat', sans-serif;
    padding-top: 0px;
    margin: 0;
    font-size: 12px;
    font-weight: 100;
    color: #F6F9FC;
    display: flex;
    justify-content: flex-start;
    padding-left: 15px;
    padding-bottom: 0px;
`

const MainDashboardUpperGrid = styled.div`
    background-color: #F6F9FC;
    padding: 20px 20px;
    display: grid;
    grid-template-columns: 35% 65%;
`

const UpperGridContainer = styled.div`
    text-align: center;
    padding: 10px 10px;
`

const StyledCustomAvatar = styled.img`
    height: 65px;
    width: 65px;
    border-radius: 50%;
    vertical-align: middle;
    border: 2px solid white;
`

const StyledDefaultAvatar = styled.img`
    height: 65px;
    width: 65px;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 2px solid white;
    
`
const HelperSpan = styled.span`
    display: inline-block;
    vertical-align: middle;
    height: 100%;
`

const DetailsContainer = styled.div`
    margin: 0;
    border-right: 1px solid white;
    padding-right: 40px;
    height: 110px;
    padding-top: 10px;
`

class MainDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        // const userDetails = getJWT();
        this.props.userGetProfilePicture();

        const { firstName, lastName, userName, email } = this.props.userDetails;

        this.setState({
            firstName,
            lastName,
            userName,
            email,
        });
    }

    renderDashBoardProfilePicture = () => {
        if (this.props.userDetails !== undefined && this.props.userDetails !== null) {

            const { url, constraints } = this.props.userDetails.profileImg;
            return (
                <>
                    <HelperSpan /><StyledCustomAvatar src={url} />
                </>
            )
        } else {
            return (
                <>
                    <HelperSpan /><StyledDefaultAvatar src={defaultAvatar} />
                </>
            )
        }
    }


    render() {

        const { firstName, lastName, userName, email } = this.state;

        return (
            <MainDashboardContainer>
                <MainDashboardHeaderContainer>
                    <Fade>
                        <div>
                            {this.renderDashBoardProfilePicture()}
                        </div>
                        <DetailsContainer>
                            <MainDashboardUserNameHeader>{userName} </MainDashboardUserNameHeader>
                            <MainDashboardHeader>{firstName}, {lastName} </MainDashboardHeader>
                            <MainDashboardHeader2>{email}</MainDashboardHeader2>
                        </DetailsContainer>
                    </Fade>
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

const mapStateToProps = state => {
    return {
        userDetails : state.userSettings.userSettings,
    }
}

export default connect(mapStateToProps, { userGetProfilePicture })(MainDashboard);