import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css'

export const Modal = ({ onClick, openModal }) => {
    
    //Close modal on Escape
    useEffect(() => {
        const handleKeydown = (e) => {
            if (e.code === 'Escape') {
                onClick()
            }
        };
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };

    
    }, [onClick]);

    //Close modal on click outside
    const handleCloseModal = (e) => {
        if (e.target === e.currentTarget) {
            onClick()
        }
    };
    return (
        <div className={css.overlay} onClick={handleCloseModal}>
            <div className={css.modal}>
                <img src={openModal} alt="" width="800" height="600"/>
            </div>  
        </div>
    )
}

Modal.prototypes = {
    onclick: PropTypes.func.isRequired,
    openModal: PropTypes.string.isRequired
}