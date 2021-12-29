import { useCallback, useState, useEffect, useRef } from "react";
import { Button, Input } from "antd";
import useInput from "../../hooks/useInput";
import { ChatPageContainer, FormBox, Footer } from "./style";
import { CommentContainer, Loading } from "../../components/comment/style";
import SingleComment from "../../components/comment";
import { axiosInstance } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import InfiniteScroll from "../../hooks/useInfiniteScroll";
import { RootState } from "../../redux/store";
import { CommentType as Comment } from "../../components/comment";

const { TextArea } = Input;

const ChatPage = () => {
  const [value, valueHandler, setValue] = useInput("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const { currentUser } = useSelector((state: RootState) => state);
  const fetchMore = useRef<HTMLDivElement>(null);
  const intersecting = InfiniteScroll(fetchMore);

  useEffect(() => {
    const getData = async () => {
      const cursor = comments[comments.length - 1]?._id || "";
      try {
        const res = await axiosInstance.get(
          `/api/chat/getChat?cursor=${cursor}`,
        );

        !res.data.length && setHasNext(false);
        setComments((prev) => [...prev, ...res.data]);
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.");
      }
    };

    if (intersecting && hasNext) {
      getData();
    }
  }, [intersecting]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!currentUser) {
        // 로그인 유저가 아닐 시
        setValue("");
        return toast.error("You need to login", { autoClose: 2500 });
      }

      if (!value.trim()) return;

      const data = {
        writer: currentUser._id,
        content: value,
      };

      const getData = async () => {
        try {
          const res = await axiosInstance.post("/api/chat/saveChat", data);
          const chat = [
            {
              _id: res.data._id,
              writer: {
                _id: currentUser._id,
                image: currentUser.image,
                name: currentUser.name,
              },
              content: res.data.content,
              createAt: res.data.createdAt,
            },
          ];
          setComments([...chat, ...comments]);
          setValue("");
        } catch (err) {
          alert("잠시 후에 다시 시도해주세요.");
        }
      };

      getData();
    },
    [value],
  );

  const onKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") onSubmit(e);
    },
    [value],
  );

  const removeComment = async (id: string) => {
    try {
      const res = await axiosInstance.post("/api/chat/removeChat", { id });
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
    <ChatPageContainer>
      <br />
      <h2>You can write whatever you want !</h2>
      <hr />
      <FormBox>
        <form onKeyPress={onKeyPress}>
          <TextArea value={value} onChange={valueHandler} onSubmit={onSubmit} />
          <Button onClick={onSubmit}>Submit</Button>
        </form>
      </FormBox>
      <br />
      <div>
        <CommentContainer>
          {comments?.map((comment, index) => (
            <div key={index}>
              <SingleComment
                comment={comment}
                owner={currentUser?._id === comment.writer._id}
                removeComment={removeComment}
              />
            </div>
          ))}
        </CommentContainer>
      </div>
      <div ref={fetchMore}></div>

      <Footer />
      <ToastContainer />
    </ChatPageContainer>
  );
};

export default ChatPage;
