import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TextHighlighter.css';

const TextHighlighter = ({ content, isPlaying, onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isReadingGuideActive, setIsReadingGuideActive] = useState(false);
  const words = content.split(/(\s+)/).filter(word => word.length > 0);

  useEffect(() => {
    if (isPlaying) {
      setIsReadingGuideActive(true);
      // Only reset to beginning if we're at the end
      if (currentWordIndex >= words.length - 1) {
        setCurrentWordIndex(0);
      }
    } else {
      setIsReadingGuideActive(false);
    }
  }, [isPlaying, currentWordIndex, words.length]);

  useEffect(() => {
    let interval;
    if (isPlaying && isReadingGuideActive) {
      interval = setInterval(() => {
        setCurrentWordIndex(prev => {
          if (prev >= words.length - 1) {
            clearInterval(interval);
            onComplete();
            return prev;
          }
          return prev + 1;
        });
      }, 300); // Adjust this timing to control reading speed
    }
    return () => clearInterval(interval);
  }, [isPlaying, isReadingGuideActive, words.length, onComplete]);

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
    <div className="text-viewer-content">
      {renderContent()}
    </div>
  );
};

TextHighlighter.propTypes = {
  content: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default TextHighlighter; 