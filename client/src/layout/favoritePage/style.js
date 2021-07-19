import styled from "styled-components";

export const Favorite = styled.div`
  margin: 80px auto;
  width: 80%;
`;

export const FoodDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FoodTitle = styled.h1`
  color: #40a9ff;
  font-weight: 800;
`;

export const FoodImg = styled.img`
  width: 650px;
  height: 450px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const Ul = styled.ul`
  list-style: none;
  padding: 0;
  & > span {
    color: #40a9ff;
    font-size: 20px;
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
