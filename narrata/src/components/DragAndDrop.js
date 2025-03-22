import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import './DragAndDrop.css';

const DragAndDrop = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type !== 'application/pdf') {
        setShowPopup(true);
        return;
      }
      onFileSelect(file);
    }
  };

  return (
    <>
      <div 
        className="drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <p>Drag and drop a PDF file here or click to select</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".pdf"
          style={{ display: 'none' }}
        />
      </div>
      {showPopup && (
        <Popup 
          message="Please upload a PDF file" 
          onClose={() => setShowPopup(false)} 
        />
      )}
    </>
  );
};

DragAndDrop.propTypes = {
  onFileSelect: PropTypes.func.isRequired
};

export default DragAndDrop; 