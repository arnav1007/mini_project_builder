import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Modal from './components/Modal';
import DraggableElement from './components/DraggableElement';
import localforage from 'localforage';
import './styles.css';

const App = () => {
  const [elements, setElements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [selectedElementId, setSelectedElementId] = useState(null);

  useEffect(() => {
    // Load saved elements from local storage
    localforage.getItem('elements').then((savedElements) => {
      if (savedElements) setElements(savedElements);
    });
  }, []);

  useEffect(() => {
    // Save elements to local storage
    localforage.setItem('elements', elements);
  }, [elements]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedElementId !== null) {
        if (event.key === 'Enter') {
          const element = elements.find(el => el.id === selectedElementId);
          setCurrentElement(element);
          setModalVisible(true);
        } else if (event.key === 'Delete') {
          setElements(elements.filter(el => el.id !== selectedElementId));
          setSelectedElementId(null);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedElementId, elements]);

  const handleDragStart = (event) => {
    const elementType = event.target.dataset.type;
    event.dataTransfer.setData('type', elementType);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('type');
    const x = event.clientX;
    const y = event.clientY;
    setCurrentElement({ id: null, type, x, y, config: {} });
    setModalVisible(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const saveElement = (config) => {
    if (currentElement.id === null) {
      const newElement = { ...currentElement, id: Date.now(), config };
      setElements([...elements, newElement]);
    } else {
      setElements(elements.map(el => el.id === currentElement.id ? { ...el, config } : el));
    }
    setModalVisible(false);
    setCurrentElement(null);
    setSelectedElementId(null);
  };

  const handleDragEnd = (id, x, y) => {
    setElements((prevElements) =>
      prevElements.map((el) => (el.id === id ? { ...el, x, y } : el))
    );
  };

  const handleSelectElement = (id) => {
    setSelectedElementId(prevId => (prevId === id ? null : id)); // Deselect if already selected
  };

  const exportToJson = () => {
    const dataStr = JSON.stringify(elements, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'page_configuration.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="app">
      <Canvas onDrop={handleDrop} onDragOver={handleDragOver}>
        {elements.map((element) => (
          <DraggableElement
            key={element.id}
            element={element}
            onDragEnd={handleDragEnd}
            onSelect={handleSelectElement}
            isSelected={element.id === selectedElementId}
          />
        ))}
      </Canvas>
      <Sidebar onDragStart={handleDragStart} onExport={exportToJson} />
      {modalVisible && (
        <Modal
          onSave={saveElement}
          element={currentElement}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default App;
