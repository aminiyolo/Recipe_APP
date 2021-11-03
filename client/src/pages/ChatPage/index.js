import React, { useCallback, useState, useEffect, useRef } from "react";
import { Button, Input } from "antd";
import useInput from "../../hooks/useInput";
import axios from "axios";
import { ChatPageContainer, FormBox, Footer } from "./style";
import { CommentContainer, Loading } from "../../components/comment/style";
import SingleComment from "../../components/comment/SingleComment";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import InfiniteScroll from "../../hooks/infiniteScroll";

const { TextArea } = Input;

const ChatPage = () => {
  const [value, valueHandler, setValue] = useInput("");
  const [comments, setComments] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const { currentUser } = useSelector((state) => state);
  const fetchMore = useRef(null);
  const intersecting = InfiniteScroll(fetchMore);

  useEffect(() => {
    if (intersecting && hasNext) {
      getData();
    }
  }, [intersecting]);

  const getData = async () => {
    const cursor = comments[comments.length - 1]?._id || "";
    try {
      const res = await axios.get(`/api/chat/getChat?cursor=${cursor}`);
      if (!res.data.length) setHasNext(false);

      setComments((prev) => [...prev, ...res.data]);
    } catch (err) {
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!currentUser) {
        // 로그인 유저가 아닐 시
        setValue("");
        toast.error("You need to login", { autoClose: 2500 });
        return;
      }

      if (!value.trim()) return;

      let data = {
        writer: currentUser._id,
        content: value,
      };

      const getData = async () => {
        try {
          const res = await axios.post("/api/chat/saveChat", data);
          let chat = [
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
    [value]
  );

  const onKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") onSubmit(e);
    },
    [value]
  );

  const removeComment = async (id) => {
    let data = {
      id,
    };

    try {
      const res = await axios.post("/api/chat/removeChat", data);
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
