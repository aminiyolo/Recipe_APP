import React, { useState } from "react";
import { Button, Input } from "antd";
import Comment from "./comment";
import useInput from "../../components/hook";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../../components/fetcher";
import { ChatPageContainer, FormBox, Footer } from "./style";

const { TextArea } = Input;

const ChatPage = ({ Data }) => {
  const [value, valueHandler, setValue] = useInput("");
  const [comments, setComments] = useState([]);
  const { data: DATA } = useSWR("api/users/user", fetcher);

  const onSubmit = (e) => {
    e.preventDefault();
    if (DATA.isAuth === false) {
      setValue("");
      return alert("You need to login");
    }

    if (!value.trim()) {
      return;
    } else {
      let data = {
        writer: Data._id,
        content: value,
      };

      axios.post("/api/chat/saveChat", data).then((response) => {
        if (response.data.success) {
          let chat = [
            {
              _id: response.data.info._id,
              writer: {
                image: DATA.image,
                name: DATA.name,
              },
              content: response.data.info.content,
              createAt: response.data.info.createdAt,
            },
          ];
          setComments([...comments, ...chat]);
          setValue("");
        }
      });
    }
  };

  return (
    <ChatPageContainer>
      <br />
      <h2>Have a small talk !</h2>
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
