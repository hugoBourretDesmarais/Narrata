import React, { useState } from 'react';
import DragAndDrop from './components/DragAndDrop';
import TextViewer from './components/TextViewer';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  return (
    <div className={`App ${selectedFile ? 'viewer-active' : ''}`}>
      <header className="App-header">
        <h1>Narrata</h1>
        {selectedFile && (
          <button className="back-button" onClick={handleBack}>
            ← Back
          </button>
        )}
      </header>
      <main className="App-content">
        {!selectedFile ? (
          <DragAndDrop onFileSelect={handleFileSelect} />
        ) : (
          <TextViewer file={selectedFile} />
        )}
      </main>
    </div>
  );
}

export default App;
