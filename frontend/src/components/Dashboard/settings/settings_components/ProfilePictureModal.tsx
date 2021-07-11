import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from '@material-ui/core/Modal';
import GeneralButton from '../../general_components/GeneralButton';
import FileInput from './FileInput';

import AvatarEditor from 'react-avatar-editor';
import DropZone from 'react-dropzone';

//Redux
import { connect } from 'react-redux';
import { userAddNewProfilePicture } from '../../../../redux/userSettings/UserSettingActions';
import { AnyAaaaRecord } from 'dns';

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
    top: 40%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    background-color: white;
    text-align: center;
    border-radius: 0.5rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

    animation: ${fadein} 0.5s ease-in-out;
`;

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 65% 35%;
`;

const ModalHeader = styled.h1`
    font-family: 'Lato', sans-serif;
    font-size: 1.4em;
    font-weight: 700;
    color: ${(props) => props.theme.text};
    opacity: 1;
    text-align: left;
    margin-bottom: 0.5rem;
`;

const ModalDescText = styled.h2`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 600;
    color: ${(props) => props.theme.text};
    opacity: 0.7;
    text-align: left;
`;

const PictureContainer = styled.div`
    border-right: 1px solid black;
    padding: 2rem 2rem;
`;

const UploadFileContainer = styled.div`
    display: flex;
    align-items: center;
    /* margin: 1rem 0; */
    text-align: left;
    margin-bottom: 1rem;
`;

const UploadFileText = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 700;
    color: ${(props) => props.theme.text};
    opacity: 1;
    text-align: left;
    margin-left: 1rem;
`;

const DropContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    text-align: left;
    margin: 1rem 0;
`;

const DropWrapper = styled.div``;

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

const PreviewTextContainer = styled.div`
    border-left: 3px solid rgba(0, 0, 34, 0.1);
`;

const PreviewImageContainer = styled.div`
    text-align: center;
`;

const SettingsContainer = styled.div``;
//Interface:
interface ProfilePictureModalProps {
    openState: boolean;
    closeFunc: () => void;
    userAddNewProfilePicture: (img: any, rect: any) => void;
}

const ProfilePictureModal = ({
    openState,
    closeFunc,
    userAddNewProfilePicture,
}: ProfilePictureModalProps): JSX.Element => {
    //Editor ref
    const editorRef = useRef();

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
        const previewImg = (editorRef as any).current
            .getImageScaledToCanvas()
            .toDataURL();
        const previewRect = (editorRef as any).current.getCroppingRect();

        setPreview({
            ...preview,
            image: previewImg,
            rect: previewRect,
        });
    };

    //Avatar Adjustment Handler
    const adjustAvatarState = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        setAvatarState({
            ...avatarState,
            [e.target.name]: val,
        });
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

    return (
        <MainContainer>
            <Modal open={openState} onClose={closeFunc}>
                <ModalContainer>
                    <ContentWrapper>
                        <PictureContainer>
                            <ModalHeader>Edit Profile Picture</ModalHeader>
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
                        <SettingsContainer></SettingsContainer>
                    </ContentWrapper>
                </ModalContainer>
            </Modal>
        </MainContainer>
    );
};

export default connect(null, { userAddNewProfilePicture })(ProfilePictureModal);
