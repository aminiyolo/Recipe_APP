import styled from "styled-components";

export const RightMenuContainer = styled.div`
  display: flex;
  margin-right: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  margin-right: 12px;
  line-height: 30px;

  & > .login {
    & > a {
      font-size: 1rem;
      color: black;
      transition: all 300ms ease-in;

      &:hover {
        color: #40aaff;
        letter-spacing: 0.2rem;
      }
    }
  }
`;

export const Logout = styled.span`
  font-size: 1rem;
  padding-bottom: 7px;
  transition: all 300ms ease-in;

  &:hover {
    cursor: pointer;
    color: #40aaff;
    border-bottom: 2px solid #40aaff;
    letter-spacing: 0.2rem;
  }
`;
