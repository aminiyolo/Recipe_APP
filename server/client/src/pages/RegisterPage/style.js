import styled from "styled-components";

export const AuthButton = styled.button`
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  background-color: #ff4a3d;
  cursor: pointer;
  color: white;
  padding: 5px 8px;
`;

export const H2 = styled.h2`
  text-align: center;
  padding-top: 20px;
  font-size: 2rem;
  font-weight: 700;
  color: white;
`;

export const Container = styled.div`
  border-radius: 7px;
  width: 35%;
  margin-bottom: 0px;

  @media screen and (max-device-width: 590px) {
    width: 100%;
  }
`;

export const Background = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  @media screen and (max-device-width: 590px) {
    width: 135%;
    margin: 0 auto;
  }

  @media screen and (max-width: 400px) {
    width: 165%;
    /* width: max-content */
    margin: 0;
  }
`;

export const Error = styled.div`
  color: red;
  margin: 8px 0 16px;
  font-weight: bold;
`;

export const Form = styled.form`
  margin: 30px auto 0;
  max-width: 25rem;
  overflow-x: hidden;

  @media screen and (max-width: 580px) {
    overflow-x: hidden;
    width: 80%;
    height: 70%;
  }
`;

export const Input = styled.input`
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin: 0 0 20px;
  width: 100%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  height: 44px;
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 1.125rem;
  line-height: 1.33333333;
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    outline: none;
    border: 2px solid #40a9ff;
  }

  @media screen and (max-width: 991px) {
    width: 100%;
  }

  @media screen and (max-width: 760px) {
    width: 100%;
    font-size: 1rem;
  }

  @media screen and (max-width: 400px) {
    width: 100%;
    font-size: 1rem;
  }
`;

export const LinkContainer = styled.p`
  font-size: 13px;
  color: #616061;
  margin: 0 auto 8px;
  width: 25rem;
  max-width: 400px;
  padding-bottom: 20px;
  & a {
    color: #1264a3;
    text-decoration: none;
    font-weight: 700;
    &:hover {
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 580px) {
    text-align: left;
  }
`;

export const Label = styled.label`
  margin-bottom: 16px;
  & > span {
    display: block;
    text-align: left;
    padding-bottom: 8px;
    font-size: 15px;
    cursor: pointer;
    line-height: 1.46666667;
    font-weight: 700;
  }
`;

export const Button = styled.button`
  margin-bottom: 12px;
  width: 100%;
  max-width: 100%;
  color: #fff;
  background-color: #40a9ff;
  border: none;
  font-size: 18px;
  font-weight: 900;
  height: 44px;
  min-width: 96px;
  padding: 0 1rem 0.25rem;
  transition: all 80ms linear;
  user-select: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  transition: all 300ms ease-in;
  &:hover {
    background-color: #ff6a3d;
    border: none;
  }
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;
