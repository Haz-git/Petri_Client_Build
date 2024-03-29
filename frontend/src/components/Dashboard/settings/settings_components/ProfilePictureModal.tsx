import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from '@material-ui/core/Modal';
import GeneralButton from '../../general_components/GeneralButton';
import FileInput from './FileInput';
import Slider from '@material-ui/core/Slider';
import { deviceMin } from '../../../../devices/breakpoints';

import AvatarEditor from 'react-avatar-editor';
import DropZone from 'react-dropzone';

//Redux
import { connect } from 'react-redux';
import { userAddNewProfilePicture } from '../../../../redux/userSettings/UserSettingActions';
import { toggleSnackbarOpen } from '../../../../redux/snackBar/snackBarActions';

//Styles:
export const fadein = keyframes`
    from {
        opacity: 0;
        -webkit-transform: translateY(50%);
        -ms-transform: translateY(50%);
        transform: translateY(50%)
    }

    to {
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        opacity: 1;
    }
`;

const MainContainer = styled.div``;

export const ModalContainer = styled.div`
    margin-left: calc(100px + 5rem);
    margin-right: 5rem;
    position: relative;
    top: 45%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    background-color: white;
    text-align: center;
    border-radius: 0.5rem;
    -webkit-box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    -webkit-animation: ${fadein} 0.4s ease-in-out;
    animation: ${fadein} 0.4s ease-in-out;

    @media ${deviceMin.laptopSs} {
        margin-left: calc(60px + 2rem);
        margin-right: 2rem;
        top: 50%;
        max-height: 40rem;
        height: 100%;
    }

    @media ${deviceMin.tablet} {
        margin-left: calc(60px + 3rem);
        margin-right: 3rem;
        top: 45%;
        max-height: 40rem;
        height: 100%;
    }

    @media ${deviceMin.laptopS} {
        margin-left: calc(100px + 3rem);
        margin-right: 3rem;
        height: auto;
    }

    @media ${deviceMin.laptop} {
        margin-left: calc(100px + 5rem);
        margin-right: 5rem;
        height: auto;
    }
`;

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 65% 35%;

    @media ${deviceMin.laptopSs} {
        display: block;
        height: 100%;
        overflow-y: scroll;
    }

    @media ${deviceMin.tablet} {
        display: block;
        height: 100%;
        overflow-y: scroll;
    }

    @media ${deviceMin.laptopS} {
        display: grid;
        grid-template-columns: 55% 45%;
        overflow-y: hidden;
    }

    @media ${deviceMin.laptop} {
        grid-template-columns: 55% 45%;
    }

    @media ${deviceMin.laptopL} {
        grid-template-columns: 65% 35%;
    }
`;

export const ModalHeader = styled.h1`
    font-family: 'Lato', sans-serif;
    font-size: 1.4em;
    font-weight: 700;
    color: ${(props) => props.theme.text};
    opacity: 1;
    text-align: left;
    margin-bottom: 0.5rem;
`;

export const ModalDescText = styled.h2`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 600;
    color: ${(props) => props.theme.text};
    opacity: 0.7;
    text-align: left;
`;

const PictureContainer = styled.div`
    padding: 2rem 2rem;
    border-bottom: 3px solid rgba(0, 0, 34, 0.1);

    @media ${deviceMin.laptopS} {
        border-right: 3px solid rgba(0, 0, 34, 0.1);
        border-bottom: none;
    }
`;

const UploadFileContainer = styled.div`
    display: flex;
    align-items: center;
    /* margin: 1rem 0; */
    text-align: left;
    margin-bottom: 1rem;

    @media ${deviceMin.laptopSs} {
        display: block;
    }

    @media ${deviceMin.tablet} {
        display: flex;
    }
`;

const UploadFileText = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 700;
    color: ${(props) => props.theme.text};
    opacity: 1;
    text-align: left;
    margin-left: 1rem;

    @media ${deviceMin.laptopSs} {
        margin-left: 0;
        margin-top: 1rem;
    }

    @media ${deviceMin.tablet} {
        margin-top: 0;
        margin-left: 1rem;
    }
`;

const DropContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    text-align: left;
    margin: 1rem 0;

    @media ${deviceMin.laptopSs} {
        display: block;
    }

    @media ${deviceMin.laptopL} {
        display: grid;
        grid-template-columns: 50% 50%;
    }
`;

const DropWrapper = styled.div``;

const PreviewTextContainer = styled.div`
    border-left: 3px solid rgba(0, 0, 34, 0.1);

    @media ${deviceMin.laptopSs} {
        display: none;
    }

    @media ${deviceMin.laptopL} {
        display: block;
    }
`;

const PreviewText = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 700;
    color: ${(props) => props.theme.text};
    opacity: 1;
    text-align: center;
    margin-top: 0.25rem;
    margin-bottom: 1rem;
`;

const PreviewImageContainer = styled.div`
    text-align: center;
`;

const SettingsContainer = styled.div`
    position: relative;
    padding: 2rem 2rem;
`;

const CustomizationContainer = styled.div`
    margin: 2rem 0;
`;

const OptionContainer = styled.div`
    margin: 1rem 0;
`;

const OptionText = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 700;
    color: ${(props) => props.theme.text};
    opacity: 1;
    text-align: left;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 1rem 1rem;
`;

const ButtonSpacer = styled.div`
    margin: 0 0.25rem;
`;

//Interface:
interface ProfilePictureModalProps {
    openState: boolean;
    closeFunc: () => void;
    userAddNewProfilePicture: (
        img: any,
        rect: any,
        snackbarCallback: (msg: string) => void,
        btnCallback: (flag: boolean) => void
    ) => void;
    toggleSnackbarOpen: (msg: string) => void;
}

const ProfilePictureModal = ({
    openState,
    closeFunc,
    userAddNewProfilePicture,
    toggleSnackbarOpen,
}: ProfilePictureModalProps): JSX.Element => {
    //Editor ref
    const editorRef = useRef();

    //Button state:
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    //Avatar Customization State:
    const [avatarState, setAvatarState] = useState({
        image: '',
        width: 300,
        height: 300,
        border: 1,
        color: [0, 0, 34, 0.2],
        scale: 1,
        rotate: 0,
        borderRadius: 200,
        position: {
            x: 0.0,
            y: 0.0,
        },
    });

    // Preview State:
    const [preview, setPreview] = useState({
        image: '',
        rect: 0,
        scale: 0,
        width: 0,
        height: 0,
        borderRadius: 0,
    });

    //React Avatar Styles Object:
    const avatarStyles = {
        border: '3px solid rgba(0, 0, 34, 0.5)',
        borderRadius: '.4rem',
        boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
    };

    //Uploaded File State:
    const [uploadedFileName, setUploadedFileName] =
        useState('No file uploaded.');

    //Dropzone image handler
    const handleImageDrop = (dropped: any) => {
        setAvatarState({
            ...avatarState,
            image: dropped[0],
        });

        if (dropped[0].name.length >= 20) {
            setUploadedFileName(`Uploaded: ...${dropped[0].name.substr(-12)}`);
        } else {
            setUploadedFileName(`Uploaded: ${dropped[0].name}`);
        }
    };

    //File Input handler

    const handleImageUpload = (e: any) => {
        setAvatarState({
            ...avatarState,
            image: e.target.files[0],
        });

        if (e.target.files[0].name.length >= 20) {
            setUploadedFileName(
                `Uploaded: ...${e.target.files[0].name.substr(-15)}`
            );
        } else {
            setUploadedFileName(`Uploaded: ${e.target.files[0].name}`);
        }
    };

    //Matches the preview to editor picture on image change
    const matchPreviewToEditor = () => {
        if (avatarState.image !== '') {
            const previewImg = (editorRef as any).current
                .getImageScaledToCanvas()
                .toDataURL();
            const previewRect = (editorRef as any).current.getCroppingRect();

            setPreview({
                ...preview,
                image: previewImg,
                rect: previewRect,
            });
        }
    };

    //Avatar Adjustment Handler
    const adjustAvatarRotation = (e: any, value?: any) => {
        if (avatarState.image !== '') {
            setAvatarState({
                ...avatarState,
                rotate: value,
            });
        }
    };

    //Avatar scale handler

    const adjustAvatarScale = (e: any, value: any) => {
        if (avatarState.image !== '') {
            setAvatarState({
                ...avatarState,
                scale: value,
            });
        }
    };

    //Render Preview:
    const handlePreviewRender = () => {
        if (preview.image !== '') {
            return (
                <img
                    src={preview.image}
                    style={{
                        borderRadius: avatarState.borderRadius,
                        width: avatarState.width,
                        height: avatarState.height,
                        border: `5px solid #222444`,
                        boxShadow: `rgba(0, 0, 0, 0.19) 0px 10px 20px,rgba(0, 0, 0, 0.23) 0px 6px 6px`,
                    }}
                    alt=""
                />
            );
        }
    };

    //Handle save new profile picture:
    const handleSave = () => {
        if (avatarState.image !== '') {
            setIsButtonLoading(true);
            const img = (editorRef as any).current
                .getImageScaledToCanvas()
                .toDataURL();
            const rect = (editorRef as any).current.getCroppingRect();
            userAddNewProfilePicture(
                img,
                rect,
                toggleSnackbarOpen,
                setButtonState
            );
        }
    };

    //Buttonstate handlers:
    const setButtonState = (status: boolean) => {
        setIsButtonLoading(status);
    };

    return (
        <MainContainer>
            <Modal open={openState} onClose={closeFunc}>
                <ModalContainer>
                    <ContentWrapper>
                        <PictureContainer>
                            <ModalHeader>Profile Picture</ModalHeader>
                            <ModalDescText>
                                Drag and drop your new profile picture from your
                                files, or click 'Upload file'.
                            </ModalDescText>
                            <DropContainer>
                                <DropWrapper>
                                    <UploadFileContainer>
                                        <FileInput
                                            onUpload={handleImageUpload}
                                        />
                                        <UploadFileText>
                                            {uploadedFileName}
                                        </UploadFileText>
                                    </UploadFileContainer>
                                    <DropZone
                                        onDrop={handleImageDrop}
                                        noClick
                                        noKeyboard
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <div {...getRootProps()}>
                                                <AvatarEditor
                                                    ref={editorRef}
                                                    onImageChange={
                                                        matchPreviewToEditor
                                                    }
                                                    onImageReady={
                                                        matchPreviewToEditor
                                                    }
                                                    image={avatarState.image}
                                                    width={avatarState.width}
                                                    height={avatarState.height}
                                                    border={avatarState.border}
                                                    color={avatarState.color}
                                                    scale={avatarState.scale}
                                                    rotate={avatarState.rotate}
                                                    borderRadius={
                                                        avatarState.borderRadius
                                                    }
                                                    // position={avatarState.position}
                                                    style={avatarStyles}
                                                />
                                                <input {...getInputProps()} />
                                            </div>
                                        )}
                                    </DropZone>
                                </DropWrapper>
                                <PreviewTextContainer>
                                    <PreviewText>Live Preview</PreviewText>
                                    <PreviewImageContainer>
                                        {handlePreviewRender()}
                                    </PreviewImageContainer>
                                </PreviewTextContainer>
                            </DropContainer>
                        </PictureContainer>
                        <SettingsContainer>
                            <ModalHeader>Customization</ModalHeader>
                            <ModalDescText>
                                Modify your new profile picture with a few
                                options.
                            </ModalDescText>
                            <CustomizationContainer>
                                <OptionContainer>
                                    <OptionText>Position</OptionText>
                                    <OptionText
                                        style={{
                                            opacity: '0.7',
                                        }}
                                    >
                                        Click and drag the canvas to position
                                        your profile picture.
                                    </OptionText>
                                </OptionContainer>
                                <OptionContainer>
                                    <OptionText>Scale</OptionText>
                                    <Slider
                                        name="scale"
                                        value={avatarState.scale}
                                        onChange={adjustAvatarScale}
                                        min={1}
                                        max={20}
                                        step={1}
                                    />
                                </OptionContainer>
                                <OptionContainer>
                                    <OptionText>Rotate</OptionText>
                                    <Slider
                                        name="scale"
                                        value={avatarState.rotate}
                                        onChange={adjustAvatarRotation}
                                        min={1}
                                        max={360}
                                        step={10}
                                    />
                                </OptionContainer>
                            </CustomizationContainer>
                            <ButtonContainer>
                                <GeneralButton
                                    buttonLabel="Cancel"
                                    buttonBackground="rgba(0, 0, 34, 0.1)"
                                    buttonTextColor="rgba(5, 5, 20, 0.7)"
                                    onClick={closeFunc}
                                />
                                <ButtonSpacer />
                                <GeneralButton
                                    buttonLabel={
                                        isButtonLoading === false
                                            ? 'Save'
                                            : 'Saving...'
                                    }
                                    onClick={handleSave}
                                    isDisabledOnLoading={isButtonLoading}
                                />
                            </ButtonContainer>
                        </SettingsContainer>
                    </ContentWrapper>
                </ModalContainer>
            </Modal>
        </MainContainer>
    );
};

export default connect(null, { userAddNewProfilePicture, toggleSnackbarOpen })(
    ProfilePictureModal
);
