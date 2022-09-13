/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const memeGenerator = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: static;
  margin: 0 auto;
`;

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: '',
      bottomText: '',
      randomImg:
        'https://api.memegen.link/images/ugandanknuck/~hspecial_characters~q/underscore__-dash--.png',
      allMemeImgs: [],
    };
  }
  render() {
    return (
      <div css={memeGenerator}>
        <form>
          <input />
        </form>
      </div>
    );
  }
}

export default MemeGenerator;
