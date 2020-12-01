import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteBioNote } from '../../../redux/userBioNote/bionoteActions';

const DeleteBioNote = ({ match:{ params:{ id } }, deleteBioNote }) => {

    const [ deleteInput, setDeleteInput ] = useState('');

    const handleOnChange = e => {
        e.preventDefault();
        setDeleteInput(e.target.value);
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        if (deleteInput.trim() === id.trim()) {
            deleteBioNote(id);
        } else {
            alert(`Please enter this phrase exactly: '${id}'`);
            setDeleteInput('');
        }
    }

    return (
        <>
            <div>
                <h1>Are you sure you want to delete: '{id}' ?</h1>
                <h2>If you are absolutely certain, please type '{id}' in the box below:</h2>
                <div>
                    <form onSubmit={handleOnSubmit}>
                        <input
                            type='text'
                            value={deleteInput}
                            onChange={handleOnChange}
                        />
                        <div>
                            <button type='submit'>I am sure!</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default connect(null, { deleteBioNote })(DeleteBioNote);
