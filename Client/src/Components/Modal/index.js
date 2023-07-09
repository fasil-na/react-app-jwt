import React from 'react';
import PropTypes from 'prop-types';

function Modal({ isOpen, handleClose, children }) {
    const handleModalClose = () => {
        handleClose();
    };

    return (
        <div>
            {isOpen && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal Title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style = {{height: '500px'}}>
                                {children}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleModalClose}>
                                    Close
                                </button>
                                {/* <button type="button" className="btn btn-primary" onClick={handleModalClose}>
                                    Save Changes
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isOpen && <div className="modal-backdrop fade show"></div>}
        </div>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;