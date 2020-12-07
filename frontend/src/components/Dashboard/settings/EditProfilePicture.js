import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import DropZone from 'react-dropzone';

const EditProfilePicture = () => {

    const [ image, setImage ] = useState('');
    const [ width, setWidth ] = useState(250);
    const [ height, setHeight ] = useState(250);
    const [ border, setBorder ] = useState(20);
    const [ color, setColor ] = useState([0,0,0,1]);
    const [ scale, setScale ] = useState(1.2);
    const [ rotate, setRotate ] = useState(0);
    const [ borderRadius, setBorderRadius ] = useState(0); 
    const [ position, setPosition ] = useState({
        x: 0.5,
        y: 0.5,
    })
    
    const handleDrop = dropped => {
        console.log(dropped);
        setImage(dropped[0]);
    }

    const handleZoomChange = e => {
        e.preventDefault();
        setScale(e.target.value);
    }

    const handleBorderRadiusChange = e => {
        e.preventDefault();
        setBorderRadius(e.target.value);
    }

    const handleHeightChange = e => {
        console.log(e.target.value);
        e.preventDefault();
        setHeight(parseInt(e.target.value));
    }

    const handleWidthChange = e => {
        e.preventDefault();
        setWidth(parseInt(e.target.value));
    }

    const handlePositionChange = position => {
        setPosition(position);
    }

    return (
        <div>
            <h1>This is experimental</h1>
            <div>
                <DropZone
                    onDrop={handleDrop}
                    noClick
                    noKeyboard
                    style={{ width: '250px', height: '250px'}}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <AvatarEditor
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
            </div>
            <div>
                <h2>This is the options container</h2>
                <div>
                    <div>
                        <div>
                            Height:
                            <input
                                type='number'
                                min='250'
                                max='700'
                                value={height}
                                onChange={handleHeightChange}
                            />
                        </div>
                        <div>
                            Width:
                            <input
                                type='number'
                                min='250'
                                max='700'
                                value={width}
                                onChange={handleWidthChange}
                            />
                        </div>
                    </div>
                    <div>
                        Zoom:
                        <input type='range'
                            min='1'
                            max='20'
                            value={scale}
                            onChange={handleZoomChange}
                        />
                    </div>
                    <div>
                        Border Radius:
                        <input 
                            type='range'
                            min='0'
                            max='200'
                            value={borderRadius}
                            onChange={handleBorderRadiusChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfilePicture;