import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultAvatar from '../../../Img/default_avatar.png';
import { userGetProfilePicture } from '../../../redux/userSettings/UserSettingActions';
import Fade from 'react-reveal/Fade';


import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

//Main Dashboard Components:
import MDTodo from './MDTodo';
import MDSciNews from './MDSciNews';

//Styles:

const WrapperContainer = styled.div`
    overflow-y: hidden;
    height: 100%;
`

const SpinnerContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`


const MainDashboardContainer = styled.div`
    height: 100%;
    background-color: ${props => props.theme.background};
    z-index: 0;
    overflow-y: hidden;
    overflow: hidden;
`
const MainDashboardHeaderContainer = styled.div`
    padding-left: 40px;
    display: flex;
    text-align: center;
    background-color: ${props => props.theme.settingsHeaderBG};
    height: 86px;
    border-left: 1px solid #F6F9FC;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
    border-bottom: 1px solid #141628;
    overflow-y: hidden;
`
const MainDashboardUserNameHeader = styled.h1`
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    font-size: 25px;
    font-weight: 500;
    color: ${props => props.theme.navDetailUserName};
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
    color: ${props => props.theme.navDetailName};
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
    color: ${props => props.theme.navDetailEmail};
    display: flex;
    justify-content: flex-start;
    padding-left: 15px;
    padding-bottom: 0px;
`

const MainDashboardUpperGrid = styled.div`
    background-color: ${props => props.theme.background};
    padding: 20px 20px;
    display: grid;
    grid-template-columns: 35% 65%;
    z-index: 0;
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
    border: 2px solid ${props => props.theme.navAvatarBorder};
`

const StyledDefaultAvatar = styled.img`
    height: 65px;
    width: 65px;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 2px solid ${props => props.theme.navAvatarBorder};
    
`
const HelperSpan = styled.span`
    display: inline-block;
    vertical-align: middle;
    height: 100%;
`

const DetailsContainer = styled.div`
    margin: 0;
    padding-right: 40px;
    height: 84px;
    margin-bottom: 24px;
    padding-top: 10px;
    overflow-y: hidden;
`

class MainDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: null
        };
    }

    componentDidMount() {

        if (this.props.userDetails === undefined || this.props.userDetails === null) {

            this.setState({ loading: true }, () => {
                this.props.userGetProfilePicture()
                    .then(result => {

                        const { _id, firstName, lastName, userName, email } = this.props.userDetails;

                        this.setState({
                            _id,
                            firstName,
                            lastName,
                            userName,
                            email,
                            loading: result,
                        })


                    })
            })

        } else {

            const { _id, firstName, lastName, userName, email } = this.props.userDetails;

            this.setState({
                _id,
                firstName,
                lastName,
                userName,
                email,
                loading: false,
            })
        }
    }

    renderDashBoardProfilePicture = () => {
        if (this.props.userDetails.profileImg !== undefined && this.props.userDetails.profileImg !== null) {
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

        if (this.state.loading === false) {

            const { firstName, lastName, userName, email } = this.state;

            return (
                <>
                    <WrapperContainer>
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
                        <MainDashboardContainer>
                            <MainDashboardUpperGrid>
                                <UpperGridContainer>
                                    <MDTodo />
                                </UpperGridContainer>
                                <UpperGridContainer>
                                    <MDSciNews />
                                </UpperGridContainer>
                            </MainDashboardUpperGrid>
                        </MainDashboardContainer>
                    </WrapperContainer>
                </>
            )
        } else {
            return (
                <>
                    <SpinnerContainer>
                        <CircularProgress />
                    </SpinnerContainer>
                </>
            )
        }
    }
}

const mapStateToProps = state => {

    return {
        userDetails: state.userSettings.userSettings,
    }
}

export default connect(mapStateToProps, { userGetProfilePicture })(MainDashboard);