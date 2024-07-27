// Sidebar.js
import React from 'react';

const Sidebar = ({ onDragStart, onExport }) => {
  return (
    <div className="sidebar">
      <div>
        <h2>BLOCKS</h2>
        <div className="block" data-type="label" draggable onDragStart={onDragStart}>
          <span className="block-icon"></span>
          <span className="block-text">Label</span>
        </div>
        <div className="block" data-type="input" draggable onDragStart={onDragStart}>
          <span className="block-icon"></span>
          <span className="block-text">Input</span>
        </div>
        <div className="block" data-type="button" draggable onDragStart={onDragStart}>
          <span className="block-icon"></span>
          <span className="block-text">Button</span>
        </div>
      </div>
      <button className="export-button" onClick={onExport}>Export to JSON</button>
    </div>
  );
};

export default Sidebar;
