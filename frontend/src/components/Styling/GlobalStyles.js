//Creating Global Style:
import { createGlobalStyle} from "styled-components";


export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Nunito', sans-serif, helvetica;
    transition: all 0.50s linear;
  }
`
