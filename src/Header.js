import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const header = css`
  background-color: #00003f;
  color: yellow;
  font-size: 60px;
  font-weight: bold;
  margin: 0 auto;
  font-family: monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  position: static;
  width: 100%;
  padding: 0;
`;

export default function Header() {
  return (
    <div css={header}>
      <p>Meme generator</p>
    </div>
  );
}
