//Creating Global Style:
import { createGlobalStyle} from "styled-components";

//Trying to create two global styles.. one for the landing page and one for the dashboard.
//It seems as though whoever is nested higher takes precedent and overrules the lower level.

export const DashboardGlobalStyles = createGlobalStyle`

  html {
    height: 100%;
  }

  body {
    background: ${({ theme }) => theme.background};
    /* color: ${({ theme }) => theme.text}; */
    /* font-family: 'Nunito', sans-serif, helvetica;
    transition: all 0.50s linear; */
    min-height: 100%;
  }
`

