import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TextHighlighter.css';

const TextHighlighter = ({ content }) => {
  const [isReadingGuideActive, setIsReadingGuideActive] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  // Split content into words while preserving whitespace
  const words = content.split(/(\s+)/).filter(word => word.length > 0);

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

  return (
    <>
      <div className="text-viewer-content">
        {renderContent()}
      </div>
      {isReadingGuideActive && (
        <div className="reading-guide-info">
          Press SPACE to toggle reading guide • Use arrow keys to navigate
        </div>
      )}
    </>
  );
};

TextHighlighter.propTypes = {
  content: PropTypes.string.isRequired
};

export default TextHighlighter; 