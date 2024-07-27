// Canvas.js
import React from 'react';

const Canvas = ({ onDrop, onDragOver, children }) => (
  <div className="canvas" onDrop={onDrop} onDragOver={onDragOver}>
    {children}
  </div>
);

export default Canvas;
