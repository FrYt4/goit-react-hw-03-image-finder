import PropTypes from 'prop-types';
import { DNA } from 'react-loader-spinner'


export const Loader = ({ visible, height, width, ariaLabel, wrapperStyle, wrapperClass }) => {
    const style = { textAlign: 'center' };
    return (
        <div style = { style } >
  <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass = "dna-wrapper"
            />
        </div >
    )
};
Loader.propTypes = {
        visible: PropTypes.bool,
        height: PropTypes.string,
        width: PropTypes.string,
        ariaLabel: PropTypes.string,
        wrapperStyle: PropTypes.object,
        wrapperClass: PropTypes.string,
    }
