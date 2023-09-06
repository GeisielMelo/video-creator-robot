// eslint-disable-next-line
import Font from "../fonts/Mark-Pro.ttf" 
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

// Custom scroll bar
::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.silver};
}

::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.color.blue};
    border-radius: 4px;
} 
`;

export default GlobalStyle;
