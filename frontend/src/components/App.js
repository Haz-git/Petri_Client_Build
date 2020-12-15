//Dependencies
import React, { useState, useEffect } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
 
//Components
import Navbar from './landingPage/Navbar';
import MainLandingPage from './landingPage/MainLandingPage';
import SignUpForm from './signupPage/SignUpForm';
import history from '../historyObject';
import LoginForm from '../components/loginPage/LoginForm';
import Logout from '../components/Logout';
import LoadingPage from './LoadingPage';

//Authentication Component:
import AuthenticatedComponents from '../components/authComponents/AuthenticatedComponents';

//Authenticated Components:
import MainDashboard from '../components/Dashboard/homePage/MainDashboard';
import Calendar from './Dashboard/calendar/Calendar';
import Meetings from '../components/Dashboard/Meetings';
import Messenger from '../components/Dashboard/messenger/Messenger';
import CreateBioNote from '../components/Dashboard/bioNotes/CreateBioNote';
import NewBioNote from '../components/Dashboard/bioNotes/NewBioNote';
import ReadBioNote from '../components/Dashboard/bioNotes/ReadBioNote';
import EditBioNote from '../components/Dashboard/bioNotes/EditBioNote';
import DeleteBioNote from '../components/Dashboard/bioNotes/DeleteBioNote';
import SciToolsLanding from './Dashboard/sciTools/SciToolsLanding';
import LazyLacZ from './Dashboard/sciTools/LazyLacZ';
import Collection from './Dashboard/sciTools/Collection';
import LacZ from './Dashboard/sciTools/LacZ';
import LacZCompareCharts from './Dashboard/sciTools/LacZCompareCharts';
import UserSettings from './Dashboard/settings/UserSettings';
import EditProfilePicture from './Dashboard/settings/EditProfilePicture';

//Themes and global styles:
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/Styling/GlobalStyles";
import { lightTheme, darkTheme } from "../components/Styling/Theme";
import { useDarkMode } from '../components/Styling/useDarkMode';
import Toggle from '../components/Styling/Toggler';

//Styling:

const AppContainer = styled.div`
    background-color: #F6F9FC;
`
const DashboardContainer = styled.div`
    margin-left: 83.9375px;
    padding: 0px;
`


const App = () => {

    //Update: This theme controller seems to control the entire app with a switch, which is good. However, how should I implement a theme controlling button...on let's say... the settings page?

    // const [ theme, themeToggler ] = useDarkMode();

    // const themeMode = theme === 'light' ? lightTheme : darkTheme;

    return (
        <>
            <AppContainer>
                <Router history={history}>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={MainLandingPage} />
                        <Route exact path='/signup' component={SignUpForm} />
                        <Route exact path='/login' component={LoginForm} />
                        <Route exact path='/loading' component={LoadingPage} />
                        <AuthenticatedComponents>
                            {/* <ThemeProvider theme={themeMode}>
                                <GlobalStyles /> */}
                                <DashboardContainer>
                                    <Route exact path='/dashboard' component={MainDashboard} />
                                    <Route exact path='/calendar' component={Calendar} />
                                    <Route exact path='/meetings' component={Meetings} />
                                    <Route exact path='/messenger' component={Messenger} />
                                    <Route exact path='/createbionote' component={CreateBioNote} />
                                    <Route exact path='/logout' component={Logout} />
                                    <Route exact path='/newbionote' component={NewBioNote} />
                                    <Route exact path='/readbionote/:id' component={ReadBioNote} />
                                    <Route exact path='/editbionote/:id' component={EditBioNote} />
                                    <Route exact path='/deletebionote/:id' component={DeleteBioNote} />
                                    <Route exact path='/scitools' component={SciToolsLanding} />
                                    <Route exact path='/scitools/lazylacz' component={LazyLacZ} />
                                    <Route exact path='/scitools/lazylacz/collection/:id' component={Collection} />
                                    <Route exact path='/scitools/lazylacz/lacz/:id' component={LacZ} />
                                    <Route exact path='/scitools/lazylacz/lacz/compare/:id' component={LacZCompareCharts} />
                                    <Route exact path='/settings' component={UserSettings} />
                                    <Route exact path='/settings/editProfilePicture/:id' component={EditProfilePicture} />
                                </DashboardContainer>
                            {/* </ThemeProvider> */}
                        </AuthenticatedComponents>
                    </Switch>
                </Router>
            </AppContainer>
        </>
    )
}

export default App;
