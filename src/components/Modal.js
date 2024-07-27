// Modal.js
import React, { useState } from 'react';

const Modal = ({ onSave, element, onClose }) => {
  const [config, setConfig] = useState({
    ...element.config,
    fontSize: element.config.fontSize || '16px',
    fontWeight: element.config.fontWeight || 'normal',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConfig({ ...config, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(config);
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h2>Edit {element.type.charAt(0).toUpperCase() + element.type.slice(1)}</h2>
        <button onClick={onClose}>&times;</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Text:
          <input name="text" value={config.text || ''} onChange={handleChange} />
        </label>
        <label>
          X:
          <input name="x" value={element.x} readOnly />
        </label>
        <label>
          Y:
          <input name="y" value={element.y} readOnly />
        </label>
        <label>
          Font Size:
          <input name="fontSize" value={config.fontSize} onChange={handleChange} />
        </label>
        <label>
          Font Weight:
          <select name="fontWeight" value={config.fontWeight} onChange={handleChange}>
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="bolder">Bolder</option>
            <option value="lighter">Lighter</option>
          </select>
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Modal;
