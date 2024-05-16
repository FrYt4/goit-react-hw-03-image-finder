import PropTypes from 'prop-types';
import css from './ImageGallery.module.css'

export const ImageGallery = ({ children }) => {

    return (
        <ul className={css.ImageGallery}>
            {children}
        </ul>
    )
};

ImageGallery.prototypes = {
    children: PropTypes.node.isRequired,
};
