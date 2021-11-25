import styled from "styled-components";

export const Detail = styled.div`
  width: 85%;
  margin: 5rem auto;
`;

export const Favorite = styled.div`
  margin: 80px auto;
  width: 80%;
`;

export const FoodDetail = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    text-align: center;
  }
`;

export const FoodTitle = styled.h1`
  color: #40a9ff;
  font-weight: 800;
`;

export const FoodImg = styled.img`
  width: 50%;
  height: 24rem;
  border-radius: 3%;
  margin-bottom: 0.6rem;

  @media screen and (max-device-width: 415px) {
    width: 70%;
    height: 20rem;
  }
`;

export const Ul = styled.ul`
  list-style: none;
  padding: 0;
  & > span {
    color: #40a9ff;
    font-size: 1.25rem;
    font-weight: 650;
  }
`;

export const Instruction = styled.p`
  color: #40a9ff;
  margin-bottom: 3px;
  font-weight: 700;
  font-size: 20px;
`;

export const InstructionP = styled.p`
  color: black;
  font-size: 16px;
`;

export const Button = styled.button`
  border-radius: 5px;
  border: none;
  color: white;
  background-color: #40a9ff;
  cursor: pointer;
  transition: all 300ms ease-out;
  &:hover {
    letter-spacing: 0.2rem;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 30px;
  font-weight: 800;
`;
