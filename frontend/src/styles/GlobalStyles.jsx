import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    text-decoration: none;
}

body  {
    background-color: #ffffff;
}

// Custom scroll bar
::-webkit-scrollbar {
    width: 5px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #fff;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #393E46, #222831);
    border-radius: 4px;
} 
`;

export default GlobalStyle;
