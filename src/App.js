import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FileSaver from 'file-saver';
import { useEffect, useState } from 'react';
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
  background-color: red;
  width: 300px;
  height: 50px;
  font-size: 16px;
`;

const imageDiv = css`
  background-color: rgb(193, 190, 190);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [imgData, setImgData] = useState([]);
  const [topText, setTopText] = useState();
  const [bottomText, setBottomText] = useState();
  const [userTemplate, setUserTemplate] = useState();
  const [meme, setMeme] = useState(
    `https://api.memegen.link/images/noidea/i_have_no_idea/what_i'm_doing.png`,
  );

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
            Top text
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
            Bottom text
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
          <label htmlFor="user-template">
            Meme template
            <select
              id="user-template"
              value={userTemplate}
              onChange={(event) => {
                setUserTemplate(event.currentTarget.value);
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
          <button
            css={button}
            onClick={() =>
              setMeme(
                `https://api.memegen.link/images/${userTemplate}/${topText}/${bottomText}.png`,
              )
            }
          >
            Generate Meme
          </button>
          {/** Button Download */}
          <button
            onClick={() => {
              FileSaver.saveAs(`${meme}`, `${meme}`);
            }}
          >
            Download
          </button>
        </form>
      </div>
      <div css={imageDiv}>
        <img
          data-test-id="meme-image"
          src={meme}
          alt=""
          style={{
            maxWidth: '400px',
            maxHeight: 'auto',
          }}
        />
      </div>
    </div>
  );
}

export default App;
