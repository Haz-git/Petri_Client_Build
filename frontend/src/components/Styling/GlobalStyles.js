//Creating Global Style:
import { createGlobalStyle} from "styled-components";


export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Nunito, sans-serif, Helvetica';
    transition: all 0.50s linear;
  }
`
