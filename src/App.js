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
        const result = await fetch('https://api.memegen.link/templates/');
        const json = await result.json();
        setImgData(json);
      } catch (err) {
        throw err;
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {/**  */}
      {/** Select images */}
      <div>
        <label>
          <span>Choose picture</span>
          <select
            id="image"
            value={imgData}
            onChange={(event) => {
              setImgData(event.currentTarget.value);
              console.log(event.currentTarget.value);
            }}
          >
            {imgData.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default App;
