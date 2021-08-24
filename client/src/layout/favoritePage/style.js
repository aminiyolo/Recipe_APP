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
  width: 80%;
  height: 28rem;
  border-radius: 3%;
  margin-bottom: 0.6rem;
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
`;
