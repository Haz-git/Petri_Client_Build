import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import DropZone from 'react-dropzone';

const EditProfilePicture = () => {

    const [ image, setImage ] = useState('');
    const [ width, setWidth ] = useState(400);
    
    const handleDrop = dropped => {
        console.log(dropped);
        setImage(dropped[0]);
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
                                width={400}
                                height={400} 
                                image={image}
                            />
                            <input {...getInputProps()} />
                        </div>
                    )}
                </DropZone>
            </div>
            <div>
                <h2>This is the options container</h2>
                <div>

                </div>
            </div>
        </div>
    )
}

export default EditProfilePicture;