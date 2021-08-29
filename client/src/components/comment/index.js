import axios from "axios";
import React, { useEffect } from "react";
import SingleComment from "./singleComment";
import { CommentContainer, Loading } from "./style";

const Comment = ({ comments, setComments }) => {
  const getData = async () => {
    try {
      const res = await axios.get("/api/chat/getChat");
      setComments(res.data);
    } catch (err) {
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (comments === null) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <CommentContainer>
      {comments?.map((comment, index) => {
        return (
          <React.Fragment key={index}>
            <SingleComment comment={comment} />
          </React.Fragment>
        );
      })}
    </CommentContainer>
  );
};

export default Comment;
