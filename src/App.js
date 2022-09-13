import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import Header from './Header';

function App() {
  const [imgData, setImgData] = useState([]);

  //fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios('https://api.memegen.link/templates/');
        const img = await result.json();
        setImgData(img);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {/** Select images */}
      <div>
        <select>
          {imgData.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
