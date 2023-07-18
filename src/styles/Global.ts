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
	font-family: 'Cinzel', serif;
  position: relative;
  min-height: 100vh;
}

input {
  font-family: 'Cinzel', serif;
}

button {
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Cinzel', serif;

  &:active{
    filter: brightness(0.95);
  }
}

table {
  font-family: 'Cinzel', serif;
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

  .react-datepicker__navigation {
    width: 32px !important;
  }

  .react-datepicker-wrapper {
    width: 100% !important;
    margin-bottom: 20px;
  }
  
  .react-datepicker__input-container {
    width: 100% !important;

    input {
      width: 100% !important;
      height: 40px;
      padding: 0 10px;
      border: 1px solid #d3d3d3;
      outline: 0;
      border-radius: 5px;
    }
  }

  /* .rbc-events-container {
    max-width: 400px;
  } */

`;

export default GlobalStyles;
