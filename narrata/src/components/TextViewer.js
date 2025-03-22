import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as pdfjsLib from 'pdfjs-dist';
import './TextViewer.css';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const TextViewer = ({ file }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReadingGuideActive, setIsReadingGuideActive] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  // Split content into words while preserving whitespace
  const words = content.split(/(\s+)/).filter(word => word.length > 0);

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

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsReadingGuideActive(prev => !prev);
        if (!isReadingGuideActive) {
          setCurrentWordIndex(0);
        }
      }
    };

    const handleKeyDown = (e) => {
      if (isReadingGuideActive) {
        if (e.code === 'ArrowRight') {
          e.preventDefault();
          setCurrentWordIndex(prev => {
            const newIndex = Math.min(prev + 1, words.length - 1);
            console.log('Current word:', words[newIndex]);
            return newIndex;
          });
        } else if (e.code === 'ArrowLeft') {
          e.preventDefault();
          setCurrentWordIndex(prev => {
            const newIndex = Math.max(prev - 1, 0);
            console.log('Current word:', words[newIndex]);
            return newIndex;
          });
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isReadingGuideActive, words.length]);

  const renderContent = () => {
    if (!isReadingGuideActive) {
      return content;
    }

    return words.map((word, index) => {
      if (index === currentWordIndex) {
        return <span key={index} className="word highlighted">{word}</span>;
      }
      return <span key={index}>{word}</span>;
    });
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
      <div className="text-viewer-content">
        {renderContent()}
      </div>
      {isReadingGuideActive && (
        <div className="reading-guide-info">
          Press SPACE to toggle reading guide • Use arrow keys to navigate
        </div>
      )}
    </div>
  );
};

TextViewer.propTypes = {
  file: PropTypes.object.isRequired
};

export default TextViewer; 