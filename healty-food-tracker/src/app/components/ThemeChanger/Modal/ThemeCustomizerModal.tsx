import React, { useState } from 'react';
import { useTheme } from '../ThemeContext/ThemeContext';

const ThemeCustomizerModal: React.FC = () => {
  const { customTheme, setCustomTheme } = useTheme();
  const [bgColor, setBgColor] = useState(customTheme['bg-color'] || '#ffffff');
  const [textColor, setTextColor] = useState(customTheme['text-color'] || '#000000');
  const [outlineColor, setOutlineColor] = useState(customTheme['outline-color'] || '#007bff');

  const handleSave = () => {
    setCustomTheme({
      'bg-color': bgColor,
      'text-color': textColor,
      'outline-color': outlineColor,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Customize Your Theme</h2>

      <div className="my-4">
        <label>Background Color:</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="ml-2"
        />
      </div>

      <div className="my-4">
        <label>Text Color:</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="ml-2"
        />
      </div>

      <div className="my-4">
        <label>Outline Color:</label>
        <input
          type="color"
          value={outlineColor}
          onChange={(e) => setOutlineColor(e.target.value)}
          className="ml-2"
        />
      </div>

      <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Save Theme
      </button>
    </div>
  );
};

export default ThemeCustomizerModal;
