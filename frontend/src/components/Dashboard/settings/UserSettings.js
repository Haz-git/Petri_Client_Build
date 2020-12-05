import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//Styles:
const MainGridContainer = styled.div`
    display: grid;
    grid-template-columns: 40% 60%;
`


//Render:

const UserSettings = ({ userData }) => {
    return (
        <>
            <MainGridContainer>
                <div>
                    <div>{userData.userName}</div>
                    <div>
                        <button>Edit username</button>
                    </div>
                    <div>
                        {userData.email}
                        <div>
                            <button>Change email (username)</button>
                        </div>
                    </div>
                </div>
                <div>
                    ProfileImage should be here...
                    <div>
                        <Link to={`settings/editProfilePicture/${userData._id}`}>
                            <button>Upload/Edit Profile Image</button>
                        </Link>
                    </div>
                </div>
            </MainGridContainer>
            
        </>
    )
}

/*
Notes:

Profile Picture and avatar should use implementation of both react-avatar-editor and react-dropzone.
https://www.npmjs.com/package/react-avatar-editor
https://react-dropzone.js.org/




*/

const mapStateToProps = state => {
    return {
        userData: state.auth.userLogIn.data,
    }
}

export default connect(mapStateToProps)(UserSettings);