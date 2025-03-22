import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as pdfjsLib from 'pdfjs-dist';
import TextHighlighter from './TextHighlighter';
import Narrator from './Narrator';
import './TextViewer.css';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const TextViewer = ({ file }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const readPDF = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Read the file as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        
        // Load the PDF document
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        // Extract text from all pages
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + '\n\n';
        }
        
        setContent(fullText);
      } catch (err) {
        setError('Error reading PDF file. Please try again.');
        console.error('Error reading PDF:', err);
      } finally {
        setLoading(false);
      }
    };

    if (file) {
      readPDF();
    }
  }, [file]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  if (loading) {
    return (
      <div className="text-viewer">
        <div className="text-viewer-content loading">
          <div className="loading-spinner"></div>
          <p>Loading PDF content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-viewer">
        <div className="text-viewer-content error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-viewer">
      <TextHighlighter 
        content={content} 
        isPlaying={isPlaying}
        onComplete={handleStop}
      />
      <Narrator 
        content={content}
        onPlay={handlePlay}
        onPause={handlePause}
        onStop={handleStop}
      />
    </div>
  );
};

TextViewer.propTypes = {
  file: PropTypes.object.isRequired
};

export default TextViewer; 