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
        margin-bottom: 15px;
      }
      & > button {
        border: none;
        outline: none;
        margin-bottom: 2rem;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background: #40aaff;
        color: #fff;
        cursor: pointer;
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

export const formStyle = {
  display: "flex",
  border: "2px solid #40AAFF",
  borderRadius: "4px",
  width: "20rem",
};

export const btnStyle = {
  width: "100%",
  height: "100%",
  color: "white",
  fontSize: "1rem",
};

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 30px;
  font-weight: 800;
`;
