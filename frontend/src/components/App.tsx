//Dependencies
import React, { useState, useEffect } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import styled from 'styled-components';

//Components
import Navbar from './landingPage/Navbar';
import MainLandingPage from './landingPage/MainLandingPage';
import SignUpForm from './signupPage/SignUpForm';
import history from '../historyObject';
import LoginForm from '../components/loginPage/LoginForm';

//Authentication Component:
import AuthenticatedComponents from '../components/authComponents/AuthenticatedComponents';

//Authenticated Components:
import Snackbar from '../components/Dashboard/general_components/Snackbar';
import MainDashboard from '../components/Dashboard/homePage/MainDashboard';
import Calendar from './Dashboard/calendar/Calendar';
import Messenger from '../components/Dashboard/messenger/Messenger';
import MainNotebook from '../components/Dashboard/notebook/MainNotebook';
import EditNotePage from '../components/Dashboard/notebook/notebook_components/EditNotePage';
import SciToolsLanding from './Dashboard/sciTools/SciToolsLanding';
import LazyLacZ from './Dashboard/sciTools/LazyLacZ';
import Collection from './Dashboard/sciTools/Collection';
import LacZ from './Dashboard/sciTools/LacZ';
import LacZCompareCharts from './Dashboard/sciTools/LacZCompareCharts';
import UserSettings from './Dashboard/settings/UserSettings';

//Themes and global styles:
import { ThemeProvider } from 'styled-components';
import { DashboardGlobalStyles } from '../components/Styling/GlobalStyles';
import { lightTheme, darkTheme } from '../components/Styling/Theme';
import { getMode } from './Styling/useDarkMode';

//Styling:

const DashboardContainer = styled.div`
    padding: 0px;
`;

const App = () => {
    //We need a way for React to know when localStorage theme value changes for re-render.

    const [appTheme, setAppTheme] = useState('');

    useEffect(() => {
        //Initial render, we reach into localstorage to obtain the recently stored user theme preference.

        async function initialState() {
            const initialModeValue = await getMode();
            //Nullish coalescing to set mode value to empty string if initial mode is null.
            setAppTheme(initialModeValue ?? '');
            console.log(`App initialized with theme: ${appTheme}`);
        }

        initialState();
    }, []);

    const changeModeStatus = (modeValue: string) => {
        //This callback function is passed down to UserSettings, where the toggle button is.
        setAppTheme(modeValue);
    };

    const grabbedTheme = lightTheme;

    const renderApp = () => {
        //Meetings route set to main dashboard because currently in construction.
        return (
            <>
                <ThemeProvider theme={grabbedTheme}>
                    <Router history={history}>
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component={MainLandingPage} />
                            <Route
                                exact
                                path="/signup"
                                component={SignUpForm}
                            />
                            <Route exact path="/login" component={LoginForm} />
                            <AuthenticatedComponents>
                                <DashboardGlobalStyles />
                                <Snackbar timeout={3000} />
                                <DashboardContainer>
                                    <Route
                                        exact
                                        path="/dashboard"
                                        component={MainDashboard}
                                    />
                                    <Route
                                        exact
                                        path="/calendar"
                                        component={Calendar}
                                    />
                                    <Route
                                        exact
                                        path="/messenger"
                                        component={Messenger}
                                    />
                                    <Route
                                        exact
                                        path="/notebook/:id"
                                        component={MainNotebook}
                                    />
                                    <Route
                                        exact
                                        path="/notebook/note/:id"
                                        component={EditNotePage}
                                    />
                                    <Route
                                        exact
                                        path="/scitools"
                                        component={SciToolsLanding}
                                    />
                                    <Route
                                        exact
                                        path="/scitools/lazylacz"
                                        component={LazyLacZ}
                                    />
                                    <Route
                                        exact
                                        path="/scitools/lazylacz/collection/:id"
                                        component={Collection}
                                    />
                                    <Route
                                        exact
                                        path="/scitools/lazylacz/lacz/:id"
                                        component={LacZ}
                                    />
                                    <Route
                                        exact
                                        path="/scitools/lazylacz/lacz/compare/:id"
                                        component={LacZCompareCharts}
                                    />
                                    <Route
                                        exact
                                        path="/settings"
                                        render={(props) => (
                                            <UserSettings
                                                {...props}
                                                modeStatus={changeModeStatus}
                                            />
                                        )}
                                    />
                                </DashboardContainer>
                            </AuthenticatedComponents>
                        </Switch>
                    </Router>
                </ThemeProvider>
            </>
        );
    };

    return <>{renderApp()}</>;
};

export default App;
