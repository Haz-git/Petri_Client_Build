import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import DropZone from 'react-dropzone';
import { connect } from 'react-redux';
import { userAddNewProfilePicture } from '../../../redux/userSettings/UserSettingActions';
import TextField from '@material-ui/core/TextField';

//Styles:
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const MainPPConfigHeaderContainer = styled.div`
    padding-left: 40px;
    display: flex;
    text-align: center;
    background-color: #1c1e37;
    height: 85px;
    border-left: 1px solid #f6f9fc;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
`;

const StyledMainHeader = styled.h1`
    font-family: 'Montserrat', sans-serif;
    font-size: 50px;
    font-weight: 100;
    color: white;
`;

const MainConfigurationContainer = styled.div`
    display: flex;
    margin: 20px 20px;
    background-color: white;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 60px 40px rgba(0, 0, 0, 0.12); ;
`;

const DropContainer = styled.div`
    margin-right: 40px;
    background-color: white;
`;

const OptionsContainer = styled.div`
    text-align: center;
    margin-left: 40px;
    background-color: white;
`;

const DimensionContainer = styled.div`
    padding: 10px 10px;
    display: flex;
`;

const DimensionDivider = styled.div`
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 10px;
`;

const ButtonContainer = styled.div`
    padding: 10px 10px;
`;

const RotateButtonContainer = styled.div`
    display: flex;
`;

const SaveButtonContainer = styled.div`
    display: flex;
`;

const ButtonDivider = styled.div`
    margin: 10px 10px;
`;

const PreviewContainer = styled.div`
    margin-left: 50px;
`;

//Render:

const EditProfilePicture = ({ userAddNewProfilePicture }) => {
    const editorRef = useRef(null);
    const [image, setImage] = useState('');
    const [width, setWidth] = useState(250);
    const [height, setHeight] = useState(250);
    const [border, setBorder] = useState(5);
    const [color, setColor] = useState([115, 120, 212, 0.4]);
    const [scale, setScale] = useState(1.0);
    const [rotate, setRotate] = useState(0);
    const [borderRadius, setBorderRadius] = useState(200);
    const [position, setPosition] = useState({
        x: 0.0,
        y: 0.0,
    });

    const [preview, setPreview] = useState({});

    const handleDrop = (dropped) => {
        console.log(dropped);
        setImage(dropped[0]);
    };

    const handleZoomChange = (e) => {
        console.log(e);
        setScale(e);
    };

    const handleBorderRadiusChange = (e) => {
        e.preventDefault();
        setBorderRadius(e.target.value);
    };

    const handleHeightChange = (e) => {
        console.log(e.target.value);
        e.preventDefault();
        setHeight(parseInt(e.target.value));
    };

    const handleWidthChange = (e) => {
        e.preventDefault();
        setWidth(parseInt(e.target.value));
    };

    const handlePositionChange = (position) => {
        setPosition(position);
    };

    const handleRotateLeft = (e) => {
        e.preventDefault();
        setRotate(rotate + 90);
    };

    const handleRotateRight = (e) => {
        e.preventDefault();
        setRotate(rotate - 90);
    };

    const handleSaveAndPreview = (data) => {
        const img = (editorRef as any).current
            .getImageScaledToCanvas()
            .toDataURL();
        const rect = (editorRef as any).current.getCroppingRect();

        setPreview({
            img,
            rect,
            scale,
            width,
            height,
            borderRadius,
        });
    };

    const handleSave = (data) => {
        const img = (editorRef as any).current
            .getImageScaledToCanvas()
            .toDataURL();
        const rect = (editorRef as any).current.getCroppingRect();

        userAddNewProfilePicture(img, rect);
    };

    const handlePreviewRender = () => {
        if (preview !== null && preview !== undefined) {
            const previewStyle = {
                borderRadius: `${(preview as any).borderRadius}px`,
                width: `${(preview as any).width}px`,
                height: `${(preview as any).height}px`,
            };
            return (
                <>
                    <img src={(preview as any).img} style={previewStyle} />
                </>
            );
        }
    };

    return (
        <>
            <MainPPConfigHeaderContainer>
                <StyledMainHeader>
                    Profile Picture Configuration
                </StyledMainHeader>
            </MainPPConfigHeaderContainer>
            <MainConfigurationContainer>
                <DropContainer>
                    <DropZone
                        onDrop={handleDrop}
                        noClick
                        noKeyboard
                        // style={{ width: '250px', height: '250px' }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <AvatarEditor
                                    ref={editorRef}
                                    width={width}
                                    height={height}
                                    image={image}
                                    border={border}
                                    color={color}
                                    scale={scale}
                                    rotate={rotate}
                                    borderRadius={borderRadius}
                                    position={position}
                                    onPositionChange={handlePositionChange}
                                />
                                <input {...getInputProps()} />
                            </div>
                        )}
                    </DropZone>
                </DropContainer>
                <OptionsContainer>
                    <div>
                        <DimensionContainer>
                            <DimensionDivider>
                                <TextField
                                    type="number"
                                    id="outlined-required"
                                    label="Height"
                                    variant="outlined"
                                    // min="250"
                                    // max="700"
                                    value={height}
                                    placeholder={`${height}`}
                                    onChange={handleHeightChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </DimensionDivider>
                            <DimensionDivider>
                                <TextField
                                    type="number"
                                    id="outlined-required"
                                    label="Width"
                                    variant="outlined"
                                    // min="250"
                                    // max="700"
                                    value={width}
                                    placeholder={`${width}`}
                                    onChange={handleWidthChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </DimensionDivider>
                        </DimensionContainer>
                        <div>
                            <Typography
                                id="discrete-slider-small-steps"
                                gutterBottom
                            >
                                Zoom
                            </Typography>
                            <Slider
                                defaultValue={scale}
                                aria-labelledby="small-steps-zoom-slider"
                                step={1}
                                marks
                                min={1}
                                max={20}
                                valueLabelDisplay="auto"
                                onChange={(event, value) =>
                                    handleZoomChange(value)
                                }
                            />
                        </div>
                        <ButtonContainer>
                            <RotateButtonContainer>
                                <ButtonDivider>
                                    <Button
                                        variant="dark"
                                        onClick={handleRotateLeft}
                                    >
                                        Rotate Left
                                    </Button>
                                </ButtonDivider>
                                <ButtonDivider>
                                    <Button
                                        variant="dark"
                                        onClick={handleRotateRight}
                                    >
                                        Rotate Right
                                    </Button>
                                </ButtonDivider>
                            </RotateButtonContainer>
                            <SaveButtonContainer>
                                <ButtonDivider>
                                    <Button
                                        variant="primary"
                                        onClick={handleSaveAndPreview}
                                    >
                                        Preview
                                    </Button>
                                </ButtonDivider>
                                <ButtonDivider>
                                    <Button
                                        variant="success"
                                        onClick={handleSave}
                                    >
                                        Save Profile Picture
                                    </Button>
                                </ButtonDivider>
                            </SaveButtonContainer>
                        </ButtonContainer>
                    </div>
                </OptionsContainer>
                <PreviewContainer>{handlePreviewRender()}</PreviewContainer>
            </MainConfigurationContainer>
        </>
    );
};

export default connect(null, { userAddNewProfilePicture })(EditProfilePicture);
