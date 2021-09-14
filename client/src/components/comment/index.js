import axios from "axios";
import React, { useEffect, useCallback } from "react";
import SingleComment from "./SingleComment";
import { CommentContainer, Loading } from "./style";

const Comment = ({ comments, setComments, userData }) => {
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

  const removeComment = async (id) => {
    let data = {
      id,
    };

    try {
      const res = await axios.post("/api/chat/removeChat", data);
      if (res.data.success) {
        setComments(comments.filter((comment) => comment._id !== id));
      }
    } catch (err) {
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  if (comments === null) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <CommentContainer>
      {comments?.map((comment, index) => (
        <React.Fragment key={index}>
          <SingleComment
            comment={comment}
            owner={userData?._id === comment.writer._id}
            removeComment={removeComment}
          />
        </React.Fragment>
      ))}
    </CommentContainer>
  );
};

export default Comment;
