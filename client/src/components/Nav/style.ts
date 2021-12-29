import styled from "styled-components";

export const Navbar = styled.nav`
  position: fixed;
  width: 100%;
  padding: 20px 16px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 30px #f3f1f1;
  z-index: 5;
`;

export const LeftMenu = styled.div`
  display: flex;
  & > h2 {
    margin: 0;
    color: #40aaff;
    font-weight: 650;
  }

  & > .favorite {
    margin: 0;
    margin-left: 45px;
    line-height: 2rem;

    & > a {
      font-size: 1rem;
      color: darkslategray;
      padding-bottom: 7px;
      transition: all 300ms ease-out;

      &:hover {
        color: #40aaff;
        border-bottom: 2px solid #40aaff;
        letter-spacing: 0.2rem;
      }
    }
  }

  & > .chat {
    margin: 0;
    margin-left: 35px;
    line-height: 32px;
    & > a {
      font-size: 1rem;
      color: darkslategray;
      padding-bottom: 7px;
      transition: all 300ms ease-out;

      &:hover {
        color: #40aaff;
        border-bottom: 2px solid #40aaff;
        letter-spacing: 0.2rem;
      }
    }
  }
`;

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
