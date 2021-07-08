import React from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';

//Styles:
const MainContainer = styled.div``;

const ModalContainer = styled.div`
    margin-left: 100px;
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    background-color: white;
    padding: 1rem 1rem;
    text-align: center;
`;

//Interface:
interface ProfilePictureModalProps {
    openState: boolean;
    closeFunc: () => void;
}

const ProfilePictureModal = ({
    openState,
    closeFunc,
}: ProfilePictureModalProps): JSX.Element => {
    return (
        <MainContainer>
            <Modal open={openState} onClose={closeFunc}>
                <ModalContainer>TEST</ModalContainer>
            </Modal>
        </MainContainer>
    );
};

export default ProfilePictureModal;
