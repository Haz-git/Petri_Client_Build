import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import DropZone from 'react-dropzone';

const EditProfilePicture = () => {

    const [ image, setImage ] = useState('');
    const [ width, setWidth ] = useState(400);
    const [ height, setHeight ] = useState(400);
    const [ border, setBorder ] = useState(20);
    const [ color, setColor ] = useState([0,0,0,1]);
    const [ scale, setScale ] = useState(1.2);
    const [ rotate, setRotate ] = useState(0);
    
    const handleDrop = dropped => {
        console.log(dropped);
        setImage(dropped[0]);
    }

    const handleZoomChange = e => {
        e.preventDefault();
        setScale(e.target.value);
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
                        Zoom:
                        <input type='range'
                            min='1'
                            max='20'
                            value={scale}
                            onChange={handleZoomChange}
                        />
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default EditProfilePicture;