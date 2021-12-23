import dayjs from "dayjs";
import React from "react";
import { Img, Detail, Comment, DeleteButton } from "./style";

export type CommentType = {
  writer: {
    image: string;
    name: string;
    _id: string;
  };
  content?: string;
  createdAt?: string;
  _id: string;
};

interface IProps {
  comment: CommentType;
  owner?: boolean;
  removeComment: (id: string) => void;
}

const SingleComment: React.VFC<IProps> = ({
  comment,
  owner = false,
  removeComment,
}) => {
  return (
    <Comment>
      <Img src={comment.writer.image} alt="writer-image" />
      <Detail>
        <span>{comment.writer.name}</span>
        <div>
          {comment.content}
          <span>
            Created At:&nbsp;
            {dayjs(comment.createdAt).format("YYYY-MM-DD, HH:mm")}
          </span>
          {owner && <DeleteButton onClick={() => removeComment(comment._id)} />}
        </div>
      </Detail>
    </Comment>
  );
};

export default SingleComment;
