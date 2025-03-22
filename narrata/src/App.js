import { useState } from 'react';
import DragAndDrop from './components/DragAndDrop';
import TextViewer from './components/TextViewer';
import Popup from './components/Popup';
import './App.css';

function App() {
  const [showTextViewer, setShowTextViewer] = useState(false);
  const [content, setContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFilesAccepted = (files) => {
    // Here you would typically process the PDF files
    // For now, we'll just set some placeholder content
    setContent('PDF content will be displayed here...');
    setShowTextViewer(true);
  };

  const handleFileUpload = (file) => {
    if (file.type !== 'application/pdf') {
      setShowPopup(true);
      return;
    }
    setSelectedFile(file);
    setShowTextViewer(true);
  };

  const handleBack = () => {
    setShowTextViewer(false);
    setSelectedFile(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          {showTextViewer && (
            <button className="back-button" onClick={handleBack}>
              ← Back
            </button>
          )}
          <h1 className={`app-title ${showTextViewer ? 'slide-up' : ''}`}>Narrata</h1>
        </div>
        {!showTextViewer ? (
          <DragAndDrop
            onFilesAccepted={handleFilesAccepted}
            acceptedFileTypes={['.pdf']}
          />
        ) : (
          <TextViewer 
            file={selectedFile} 
            onBack={handleBack}
          />
        )}
      </header>
      {showPopup && (
        <Popup 
          message="Please upload a PDF file" 
          onClose={() => setShowPopup(false)} 
        />
      )}
    </div>
  );
}

export default App;
