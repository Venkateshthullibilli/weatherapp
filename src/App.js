
import React from 'react';
import Weather from './components/Weather';
import { useTheme } from './context/ThemeContext';
import './App.css';

function App() {
  const { theme} = useTheme();
  const bgColor = theme ? '#000000' : '#ffffff';

  return (
    <div className='app' style={{ backgroundColor: bgColor }}>
      
      <Weather />
    </div>
  );
}

export default App;
