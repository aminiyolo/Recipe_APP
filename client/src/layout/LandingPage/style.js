import styled from "styled-components";

export const LandingContainer = styled.div`
  width: 80%;
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  & > .Landing {
    text-align: center;
    padding-top: 70px;
    & > h1 {
      margin-bottom: 30px;
      font-weight: 800;
      font-size: 38px;
    }
    & > .quote {
      margin-bottom: 30px;
      font-weight: 500;
    }

    & > .formBox {
      display: flex;
      justify-content: center;
      & > form > .input {
        border: none;
      }
    }

    & > .results {
      margin-top: 15px;
    }

    & > div {
      & > h2 {
        font-weight: 800;
        margin-bottom: 35px;
      }
    }
  }
`;

export const BtnBox = styled.div`
  background-color: #40aaff;
  padding: 6px;
  width: 9%;
  margin: 0;
  cursor: pointer;
`;
