import React, { useRef, useState, useEffect } from 'react';

const DraggableElement = ({ element, onDragEnd, onSelect, isSelected }) => {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: element.x, y: element.y });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (element) {
      setPosition({ x: element.x, y: element.y });
    }
  }, [element]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onDragEnd(element.id, position.x, position.y);
      }
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        const newX = event.clientX - dragOffset.x;
        const newY = event.clientY - dragOffset.y;
        setPosition({ x: newX, y: newY });
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, dragOffset, onDragEnd, element.id, position]);

  const handleMouseDown = (event) => {
    const rect = ref.current.getBoundingClientRect();
    setIsDragging(true);
    setDragOffset({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const handleClick = () => {
    onSelect(element.id);
  };

  if (!element) {
    return null;
  }

  const style = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    fontSize: element.config.fontSize,
    fontWeight: element.config.fontWeight,
    cursor: isDragging ? 'none' : 'move',
    border: isSelected ? '2px solid red' : 'none', // Red border if selected
  };

  const buttonStyle = {
    backgroundColor: '#007bff', // Blue color for buttons
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  const inputStyle = {
    borderRadius: '4px', // Rounded edges for input fields
    padding: '10px',
    border: '1px solid #ccc',
  };

  return (
    <div
      ref={ref}
      style={style}
      className="draggable-element"
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {element.type === 'label' && (
        <label style={{ fontSize: element.config.fontSize, fontWeight: element.config.fontWeight }}>
          {element.config.text}
        </label>
      )}
      {element.type === 'input' && (
        <input
          style={{ ...inputStyle, fontSize: element.config.fontSize, fontWeight: element.config.fontWeight }}
          placeholder={element.config.text}
        />
      )}
      {element.type === 'button' && (
        <button style={{ ...buttonStyle, fontSize: element.config.fontSize, fontWeight: element.config.fontWeight }}>
          {element.config.text}
        </button>
      )}
    </div>
  );
};

export default DraggableElement;
