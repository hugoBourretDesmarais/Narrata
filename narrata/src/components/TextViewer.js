import PropTypes from 'prop-types';
import './TextViewer.css';

const TextViewer = ({ content }) => {
  return (
    <div className="text-viewer">
      <div className="text-viewer-content">
        {content || 'No content available'}
      </div>
    </div>
  );
};

TextViewer.propTypes = {
  content: PropTypes.string
};

export default TextViewer; 