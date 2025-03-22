import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Narrator.css';

const Narrator = ({ content, onPlay, onPause, onStop }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      onPause();
    } else {
      setIsPlaying(true);
      onPlay();
    }
  };

  return (
    <div className="narrator">
      <button 
        className="narrator-button"
        onClick={handlePlayPause}
        aria-label={isPlaying ? "Pause narration" : "Play narration"}
      >
        <span className="icon">{isPlaying ? "⏸" : "▶"}</span>
      </button>
    </div>
  );
};

Narrator.propTypes = {
  content: PropTypes.string.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};

export default Narrator; 