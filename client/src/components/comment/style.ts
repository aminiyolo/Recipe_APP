import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons";

export const Comment = styled.div`
  display: flex;
  margin-bottom: 20px;
  color: black;
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
    @media screen and (max-width: 415px) {
      font-size: 0.7rem;
      margin-left: 0px;
    }
  }
`;

export const DeleteButton = styled(DeleteOutlined)`
  color: red;
  cursor: pointer;
  &:hover {
    transform: rotate(-15deg);
  }
`;

export const CommentContainer = styled.div`
  margin-bottom: "30px";
  height: 58%;
  overflow-y: hidden;
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44vh;
  font-size: 30px;
  font-weight: 800;
`;
