import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteBioNote } from '../../../redux/userBioNote/bionoteActions';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteModal = ({ renderProp, renderCallBack, bionoteName, bionote_ID, deleteBioNote }) => {

    const [ show, setShow ] = useState(false);

    useEffect(() => {
        if (renderProp) {
            setShow(renderProp);
        }
    },[renderProp])

    const handleClose = () => {
        renderCallBack(false);
        setShow(false);
    }

    const handleDelete = () => {
        deleteBioNote(bionote_ID);
        renderCallBack(false);
        setShow(false);
    }

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={true}
                show={show}
                onHide={handleClose}
                backdrop='static'
                style={{
                    marginLeft: '75px'
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete '{bionoteName}'?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    By clicking 'Delete', your bionote and all of its contents will be permanently erased.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default connect(null, { deleteBioNote })(DeleteModal);