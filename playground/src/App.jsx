import { useEffect, useState } from 'react'
import { subscribe } from '../../src/index'
import './App.css'

function App() {
  const [keyValue, setKeyValue] = useState(undefined);
  useEffect(() => {
    return subscribe('a', () => {
      setKeyValue('a');
    });
  }, []);
  useEffect(() => {
    return subscribe('b', () => {
      setKeyValue('b');
    });
  }, []);

  return (
    <div className="App">
      {keyValue}
    </div>
  )
}

export default App
