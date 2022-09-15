import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FileSaver from 'file-saver';
import { useEffect, useState } from 'react';

const background = css`
  background-color: #006b8f;
  width: 100%;
  height: 1000px;
  margin: 0;
  padding: 0;
  position: absolute;

  @media screen and (max-width: 400px) {
    background-color: #006b8f;
  }
`;

const divLayout = css`
  width: 70%;
  height: 1000px;
  background-color: #d9e5d6;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 400px) {
    width: 400px;
  }
`;

const headline = css`
  font-size: 56px;
  color: #ff9b42;
  font-weight: bold;
  text-shadow: 3px 3px coral;
`;

const label = css`
  font-weight: bold;
  color: #006b8f;
`;
const inputField = css`
  width: 100%;
  border: 2px solid #ff9b42;
  box-shadow: 1px 1px coral;
  color: #006b8f;
`;

const button = css`
  font-weight: bold;
  font-size: 18px;
  color: #006b8f;
  background-color: #ff9b42;
  width: 250px;
  height: 50px;
  border-radius: 30px;
  border: 0;

  :hover {
    box-shadow: 0 5px 15px coral;
  }
`;

const buttonDiv = css`
  display: flex;
  flex-flow: row;
  justify-content: space-around;
`;

function App() {
  const [imgData, setImgData] = useState([]);
  const [topText, setTopText] = useState();
  const [bottomText, setBottomText] = useState();
  const [userTemplate, setUserTemplate] = useState();
  const [meme, setMeme] = useState(
    `https://api.memegen.link/images/noidea.png`,
  );
  // const [item, setItem] = useState([]);

  //fetch Data from API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('https://api.memegen.link/templates/');
        const json = await result.json();
        setImgData(json);
      } catch (err) {
        throw err;
      }
    };
    fetchData();
  }, []);

  return (
    <div css={background}>
      <div css={divLayout}>
        <h1 css={headline}>MEME GENERATOR</h1>
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            {/** Input Top text */}
            <label htmlFor="top-text" css={label}>
              Top text
              <input
                css={inputField}
                value={topText}
                onChange={(event) => {
                  setTopText(event.currentTarget.value);
                }}
              />
            </label>
            <br />
            <br />
            {/** Input Top text */}
            <label htmlFor="bottom-text" css={label}>
              Bottom text
              <input
                css={inputField}
                value={bottomText}
                onChange={(event) => {
                  setBottomText(event.currentTarget.value);
                }}
              />
            </label>
            <br />
            <br />
            {/** Select images */}
            <label htmlFor="user-template" css={label}>
              Meme template
              <select
                css={inputField}
                id="user-template"
                value={userTemplate}
                onChange={(event) => {
                  setUserTemplate(event.currentTarget.value);
                  console.log(event.currentTarget.value);
                }}
              >
                <option>--Choose meme template--</option>
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
            <div css={buttonDiv}>
              <button
                data-test-id="generate-meme"
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
                css={button}
                onClick={() => {
                  FileSaver.saveAs(`${meme}`, `${meme}`);
                }}
              >
                Download
              </button>
            </div>
          </form>
        </div>
        <br />
        {/** Generated Meme Image */}
        <div>
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

        {/**Local Storage */}
        {/* useEffect(() => {
        localStorage.setItem('items', JSON.stringigy(meme), [items])
      })

      useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items'));
        if (items) {
        setItems(items)
        }
        }, []); */}
      </div>
    </div>
  );
}

export default App;
