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

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

`;

export default GlobalStyles;
