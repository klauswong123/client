import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
const OutsideContainer = styled.div.attrs({
    className: 'container',
})`
    margin-top:200px;
`

const NotFound = () => (
  <OutsideContainer>
  <style type="text/css">
    {`.navbar {display: none}`
    }
  </style>
    <h1>404 - Not Found!</h1>
    <br />
    <Link to="/">
      Go Home
    </Link>
  </OutsideContainer>
);

export default NotFound;
