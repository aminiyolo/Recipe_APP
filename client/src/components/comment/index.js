import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import { CommentContainer, Loading } from "./style";

const Comment = ({ comments, setComments }) => {
  const scrollRef = useRef();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

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
        <div key={index} ref={scrollRef}>
          <SingleComment
            comment={comment}
            owner={user?._id === comment.writer._id}
            removeComment={removeComment}
          />
        </div>
      ))}
    </CommentContainer>
  );
};

export default Comment;
