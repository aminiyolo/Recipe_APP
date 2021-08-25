import styled from "styled-components";

export const Comment = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const Img = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  & > span {
    margin-bottom: 5px;
  }
  & > div {
    & > span {
      margin-left: 20px;
    }
  }
`;

export const CommentContainer = styled.div`
  margin-bottom: "30px";
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44vh;
  font-size: 30px;
  font-weight: 800;
`;
