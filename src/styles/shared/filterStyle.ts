import styled from "styled-components";

export const FilterContainer = styled.div`
  width: 100%;
  margin: 30px 0;

  input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    outline: 0;
    border: 1px solid #d3d3d3;
    padding: 0 10px;
    margin-bottom: 30px;
  }

  a {
    text-decoration: none;
    color: #000;
    width: 100px;
    border: 0;
    cursor: pointer;
    background-color: #f0f0f0;
    padding: 10px 20px;
    margin-top: 20px;
    border-radius: 5px;

    border-radius: 5px;
    font-size: 1rem;

    &:active {
      filter: brightness(0.95);
    }
  }
`;

export const TableContainer = styled.div``;
