
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	* {
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
  }

	body {
		font-family: 'Poppins', sans-serif;
		position: relative;
	}
`;

export default GlobalStyles;