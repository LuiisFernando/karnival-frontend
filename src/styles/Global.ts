import { createGlobalStyle } from "styled-components";
import * as C from "@/styles/Constants";

const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
  }

  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

body {
	font-family: 'Ysabeau SC',sans-serif;
  position: relative;
  min-height: 100vh;
}

input {
  font-family: 'Ysabeau SC',sans-serif;
}

button {
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Ysabeau SC',sans-serif;

  &:active{
    filter: brightness(0.95);
  }
}

table {
  font-family: 'Ysabeau SC',sans-serif;
  border-collapse: collapse;
  width: 100%;
  display: block;
  overflow: scroll;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

td {
  cursor: pointer;
}

td.active {
  color: green;
}

td.deleted {
  color: red;
}

@media (min-width: ${C.XL}) {
  table {
    display: table;
  }
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #AEAEAE; 
    border-radius: 4px;
  }

  .rbc-toolbar-label {
	  text-transform:capitalize
  }

`;

export default GlobalStyles;
