import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Popup.css';

const Popup = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation before calling onClose
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`popup ${isVisible ? 'visible' : ''}`}>
      <p>{message}</p>
    </div>
  );
};

Popup.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Popup; 