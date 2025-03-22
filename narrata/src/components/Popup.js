import PropTypes from 'prop-types';
import './Popup.css';

const Popup = ({ message, type = 'error' }) => {
  return (
    <div className="popup">
      <div className={`popup-content popup-${type}`}>
        <p>{message}</p>
      </div>
    </div>
  );
};

Popup.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'success', 'info'])
};

export default Popup; 