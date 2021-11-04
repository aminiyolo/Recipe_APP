import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import { CommentContainer, Loading } from "./style";
import { axiosInstance } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comment = ({ comments, setComments, fetchMore }) => {
  const scrollRef = useRef();
  const { currentUser } = useSelector((state) => state);
  const [fetchRef, setFetchRef] = useState(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    setFetchRef(fetchMore);
  }, [comments, fetchMore]);

  const removeComment = async (id) => {
    let data = {
      id,
    };

    try {
      const res = await axiosInstance.post("/api/chat/removeChat", data);
      if (res.data.success) {
        toast.success("Deletion was successful", { autoClose: 2500 });
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
            owner={currentUser?._id === comment.writer._id}
            removeComment={removeComment}
          />
        </div>
      ))}
      <div ref={fetchMore}></div>

      <ToastContainer />
    </CommentContainer>
  );
};

export default Comment;
