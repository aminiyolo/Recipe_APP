import axios from "axios";
import React, { useEffect } from "react";
import SingleComment from "../comment/singleComment";

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
    <div style={{ marginBottom: "30px" }}>
      {comments !== [] &&
        comments.map((comment) => {
          return (
            <React.Fragment>
              <SingleComment comment={comment} />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Comment;
