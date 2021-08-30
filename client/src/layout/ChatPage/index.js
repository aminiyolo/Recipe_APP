import React, { useState } from "react";
import { Button, Input } from "antd";
import Comment from "../../components/comment";
import useInput from "../../components/hook";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../../components/fetcher";
import { ChatPageContainer, FormBox, Footer } from "./style";

const { TextArea } = Input;

const ChatPage = ({ Data }) => {
  const [value, valueHandler, setValue] = useInput("");
  const [comments, setComments] = useState(null);
  const { data: DATA } = useSWR("api/users/user", fetcher);

  const onSubmit = (e) => {
    e.preventDefault();
    if (DATA.isAuth === false) {
      // 로그인 유저가 아닐 시
      setValue("");
      return alert("You need to login");
    }

    if (!value.trim()) return;

    let data = {
      writer: Data._id,
      content: value,
    };

    const getData = async () => {
      try {
        const res = await axios.post("/api/chat/saveChat", data);
        let chat = [
          {
            _id: res.data._id,
            writer: {
              image: DATA.image,
              name: DATA.name,
            },
            content: res.data.content,
            createAt: res.data.createdAt,
          },
        ];
        setComments([...comments, ...chat]);
        setValue("");
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.");
      }
    };

    getData();
  };

  return (
    <ChatPageContainer>
      <br />
      <h2>This is a Guest Book !</h2>
      <hr />
      <br />
      <Comment comments={comments} setComments={setComments} />
      <FormBox>
        <form>
          <TextArea value={value} onChange={valueHandler} onSubmit={onSubmit} />
          <Button onClick={onSubmit}>Submit</Button>
        </form>
      </FormBox>
      <Footer />
    </ChatPageContainer>
  );
};

export default ChatPage;
