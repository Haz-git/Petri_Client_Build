import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteProtocol } from '../../../redux/userLacZ/LacZActions'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteModal = ({ renderProp, renderCallBack, protocolName, protocolId, deleteProtocol }) => {

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
        deleteProtocol(protocolId);
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
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete '{protocolName}'?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    By clicking 'Delete', all of your strain data in Collection and LacZ will also be deleted. There is no recovery.
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

export default connect(null, { deleteProtocol })(DeleteModal);
