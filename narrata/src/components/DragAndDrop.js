import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import './DragAndDrop.css';

const DragAndDrop = ({ onFilesAccepted, acceptedFileTypes = ['.pdf'] }) => {
  const fileInputRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('error');

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

  const showNotification = (message, type = 'error') => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleFiles = (files) => {
    const acceptedFiles = files.filter(file => 
      acceptedFileTypes.some(type => file.name.toLowerCase().endsWith(type))
    );
    const rejectedFiles = files.filter(file => 
      !acceptedFileTypes.some(type => file.name.toLowerCase().endsWith(type))
    );

    if (rejectedFiles.length > 0) {
      showNotification(
        `Please only drop ${acceptedFileTypes.join(', ')} files. ${rejectedFiles.length} invalid file(s) detected.`,
        'error'
      );
      return;
    }

    if (acceptedFiles.length > 0) {
      showNotification(
        `Successfully added ${acceptedFiles.length} file(s)`,
        'success'
      );
      onFilesAccepted(acceptedFiles);
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
        <p>Drag and drop {acceptedFileTypes.join(', ')} files here or click to select</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept={acceptedFileTypes.join(',')}
          multiple
          style={{ display: 'none' }}
        />
      </div>
      {showPopup && (
        <Popup message={popupMessage} type={popupType} />
      )}
    </>
  );
};

DragAndDrop.propTypes = {
  onFilesAccepted: PropTypes.func.isRequired,
  acceptedFileTypes: PropTypes.arrayOf(PropTypes.string)
};

export default DragAndDrop; 