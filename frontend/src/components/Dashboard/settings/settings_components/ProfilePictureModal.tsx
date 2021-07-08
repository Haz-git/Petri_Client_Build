import React from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from '@material-ui/core/Modal';

//Styles:
const fadein = keyframes`
    from {
        opacity: 0;
        -webkit-transform: translateY(300%);
        -ms-transform: translateY(300%);
        transform: translateY(300%)
    }

    to {
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        opacity: 1;
    }
`;

const MainContainer = styled.div``;

const ModalContainer = styled.div`
    margin-left: calc(100px + 5rem);
    margin-right: 5rem;
    position: relative;
    top: 30%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    background-color: white;
    padding: 1rem 1rem;
    text-align: center;
    border-radius: 0.5rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

    animation: ${fadein} 0.2s ease-in;
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
