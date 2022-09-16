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
  position: relative;
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
  const [userTemplate, setUserTemplate] = useState('success');
  const [meme, setMeme] = useState(
    `https://api.memegen.link/images/${userTemplate}/Hi/there.png`,
  );

  function cleanInput(input) {
    let specialCharacters = input.replaceAll('?', '~q');
    specialCharacters = specialCharacters.replaceAll('&', '~a');
    specialCharacters = specialCharacters.replaceAll('%', '~p');
    specialCharacters = specialCharacters.replaceAll(' ', '_');
    specialCharacters = specialCharacters.replaceAll('#', '~h');
    specialCharacters = specialCharacters.replaceAll('/', '~s');
    specialCharacters = specialCharacters.replaceAll('%20', '_');
    return specialCharacters;
  }

  // fetch Data from API

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
    fetchData().catch((err) => console.log(err));
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
            <label htmlFor="topText" css={label}>
              Top text
            </label>
            <input
              id="topText"
              css={inputField}
              value={topText}
              onChange={(event) => {
                setTopText(event.currentTarget.value);
              }}
            />
            <br />
            <br />
            {/** Input Top text */}
            <label htmlFor="bottomText" css={label}>
              Bottom text
            </label>
            <input
              id="bottomText"
              css={inputField}
              value={bottomText}
              onChange={(event) => {
                setBottomText(event.currentTarget.value);
              }}
            />
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
                    `https://api.memegen.link/images/${cleanInput(
                      userTemplate,
                    )}/${cleanInput(topText)}/${cleanInput(bottomText)}.png`,
                  )
                }
              >
                Generate Meme
              </button>
              {/** Button Download */}
              <button
                css={button}
                onClick={() => {
                  FileSaver.saveAs(meme, meme);
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
      </div>
    </div>
  );
}

export default App;
