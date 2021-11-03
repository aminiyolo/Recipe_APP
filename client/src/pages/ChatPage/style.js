import styled from "styled-components";

export const ChatPageContainer = styled.div`
  width: 80%;
  height: 90vh;
  margin: 60px auto;
  & > h2 {
    margin-left: 70px;
  }

  @media screen and (max-width: 415px) {
    width: 88%;
  }
`;

export const FormBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  & > form {
    display: flex;
    width: 100%;
    & > button {
      padding: 0;
      width: 20%;
      height: 52px;
      font-size: 1rem;
    }
  }
`;

export const Footer = styled.div`
  padding: 40px 0px;
  height: 10px;
`;
