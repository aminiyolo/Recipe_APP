import axios from "axios";
import React, { useEffect } from "react";
import SingleComment from "../comment/singleComment";
import { CommentContainer } from "./style";

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

  return (
    <CommentContainer>
      {comments !== [] &&
        comments.map((comment) => {
          return (
            <React.Fragment>
              <SingleComment comment={comment} />
            </React.Fragment>
          );
        })}
    </CommentContainer>
  );
};

export default Comment;
