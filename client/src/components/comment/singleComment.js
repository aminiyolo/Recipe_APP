import dayjs from "dayjs";
import { Img, Detail, Comment, DeleteButton } from "./style";

const SingleComment = ({ comment, owner = false, removeComment }) => {
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
