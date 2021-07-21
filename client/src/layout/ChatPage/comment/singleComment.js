import React from "react";
import dayjs from "dayjs";
import { Img, Detail, Comment } from "./style";

const SingleComment = ({ comment }) => {
  return (
    <Comment>
      <Img src={comment.writer.image} alt="write-image" />
      <Detail>
        <span>{comment.writer.name}</span>
        <div>
          {comment.content}
          <span>
            Created At:&nbsp;
            {dayjs(comment.createdAt).format("YYYY-MM-DD, HH:mm")}
          </span>
        </div>
      </Detail>
    </Comment>
  );
};

export default SingleComment;
