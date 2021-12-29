import { createGlobalStyle } from "styled-components";
import "antd/dist/antd.css";

const GlobalStyle = createGlobalStyle`
  table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    color: black;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

`;

export default GlobalStyle;
