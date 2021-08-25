import axios from "axios";
import React, { useEffect } from "react";
import SingleComment from "./singleComment";
import { CommentContainer, Loading } from "./style";

const Comment = ({ comments, setComments }) => {
  const getData = () => {
    axios.get("/api/chat/getChat").then((response) => {
      if (response.data.success) {
        setComments(response.data.info);
      }
    });
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
