//Creating Global Style:
import { createGlobalStyle } from 'styled-components';

import { deviceMin } from '../../devices/breakpoints';

//Trying to create two global styles.. one for the landing page and one for the dashboard.
//It seems as though whoever is nested higher takes precedent and overrules the lower level.

export const DashboardGlobalStyles = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 0;
    outline: 0;
  }

  html {
    height: 100%;
  }

  body {
    background: ${({ theme }) => theme.background};
    min-height: 100%;
    margin-left: 13rem;

    @media ${deviceMin.laptopSs} {
      margin-left: 100px;
    }

    @media ${deviceMin.tablet} {
      margin-left: 13rem;
    }
  }

  h1 {
    margin: 0;
    padding: 0;
  }

  h2 {
    margin: 0;
    padding: 0;
  }

  h3 {
    margin: 0;
    padding: 0;
  }

  p {
    margin: 0;
    padding: 0;
  }

  label {
    margin: 0;
    padding: 0;
  }


`;
