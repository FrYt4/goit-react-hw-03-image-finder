import PropTypes from "propTypes";
import css from "components/ImageGalleryItem"

export const ImageGalleryItem = ({ images, onClick }) => {

    return images.map(image => {
        <li key={image.id} className={css.item}>
            <img
                src={image.webformatURL}
                alt={image.tags}
                className={css.image}
                onClick={() => onClick(image)}
            />
        </li>
    })
}

ImageGalleryItem.propTypes = {
    images: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
}