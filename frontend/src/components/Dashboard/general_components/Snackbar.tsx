import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSnackbarClose } from '../../../redux/snackBar/snackBarActions';
import { FiX } from 'react-icons/fi';
import { CheckCircle } from '@styled-icons/bootstrap/CheckCircle';

//Styles:

const fadein = keyframes`
    from {
      top: 0;
      opacity: 0;
    }
    to {
      top: 1rem;
      opacity: 1;
    }
`;

const fadeout = keyframes`
    from {
      top: 1rem;
      opacity: 1;
    }
    to {
      top: 0;
      opacity: 0;
    }
`;

const CheckIcon = styled(CheckCircle)`
    height: 1.7rem;
    width: 1.7rem;
    color: #20861b;
    margin-right: 0.75rem;
`;

const MainWrapper = styled.div`
    background-color: white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    animation: ${fadein} 0.5s, ${fadeout} 0.5s ${(props) => props.time};
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 99999 !important;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    height: auto;
    border-radius: 0.3rem;
    border: transparent;
    margin-left: 100px;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
`;

const Message = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 600;
    color: ${(props) => props.theme.text};
    margin: 0;
    padding: 0;
`;

const ButtonContainer = styled.div`
    text-align: center;
    border-left: 2px solid #e8e8e8;
    padding: 0.8rem 0.2rem;
`;

const Button = styled.button`
    height: 1.75rem;
    width: 1.75rem;
    text-align: center;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    color: ${(props) => props.theme.text};
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 34, 0.1);
    }
`;

const Snackbar = ({ timeout }) => {
    const dispatch = useDispatch();

    // select the UI states from the redux store
    const SHOW = useSelector((state: any) => state.snackBar.toggleSnackbar);
    const MESSAGE = useSelector((state: any) => state.snackBar.snackbarMessage);

    // convert the timeout prop to pass into the styled component
    let TIME = (timeout - 500) / 1000 + 's';

    let TIMER;
    function handleTimeout() {
        TIMER = setTimeout(() => {
            dispatch(toggleSnackbarClose());
        }, timeout);
    }

    function handleClose() {
        clearTimeout(TIMER);
        dispatch(toggleSnackbarClose());
    }

    useEffect(() => {
        if (SHOW) handleTimeout();
        return () => {
            clearTimeout(TIMER);
        };
    }, [SHOW, TIMER]);

    return (
        SHOW && (
            <MainWrapper time={TIME}>
                <Container>
                    <CheckIcon />
                    <Message>{MESSAGE}</Message>
                </Container>
                <ButtonContainer>
                    <Button onClick={handleClose}>
                        <FiX />
                    </Button>
                </ButtonContainer>
            </MainWrapper>
        )
    );
};

export default Snackbar;
