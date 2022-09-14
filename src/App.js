import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import Header from './Header';

const form = css`
  align-items: center;
  justify-content: center;
  font-family: 'Space Mono', monospace;
  font-weight: bold;
  background-color: rgb(193, 190, 190);
  margin-top: 0 auto;
  display: flex;
  padding-top: 10px;
  height: 250px;
`;

const button = css`
  font-family: 'Space Mono', monospace;
  font-weight: bold;
  color: yellow;
  border-radius: 10px;
  background-color: #00003f;
  width: 300px;
  height: 50px;
  font-size: 16px;
`;

function App() {
  const [imgData, setImgData] = useState([]);
  const [topText, setTopText] = useState();
  const [bottomText, setBottomText] = useState();

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

      <div css={form}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          {/** Input Top text */}
          <label>
            <span>Top text</span>
            <input
              value={topText}
              onChange={(event) => {
                setTopText(event.currentTarget.value);
              }}
            />
          </label>
          <br />
          <br />
          {/** Input Top text */}
          <label>
            <span>Bottom text</span>
            <input
              value={bottomText}
              onChange={(event) => {
                setBottomText(event.currentTarget.value);
              }}
            />
          </label>
          <br />
          <br />
          {/** Select images */}
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
          <br />
          <br />
          {/** Button Generate Meme */}
          <button css={button}>Generate Meme</button>
          {/** Button Download */}
          <button css={button}>Download</button>
          <br />
        </form>
      </div>
      <div>
        <img src={setImgData} alt="" />
        <h2>{setTopText}</h2>
        <h2>{setBottomText}</h2>
      </div>
    </div>
  );
}

export default App;
