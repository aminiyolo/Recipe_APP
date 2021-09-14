import React, { useCallback, useState, useEffect } from "react";
import { Button, Input } from "antd";
import Comment from "../../components/comment";
import useInput from "../../components/hook";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../../components/fetcher";
import { ChatPageContainer, FormBox } from "./style";

const { TextArea } = Input;

const ChatPage = () => {
  const { data: DATA } = useSWR("api/users/user", fetcher);
  const [value, valueHandler, setValue] = useInput("");
  const [comments, setComments] = useState(null);

  const getData = useCallback(async () => {
    try {
      const res = await axios.get("/api/chat/getChat");
      setComments(res.data);
    } catch (err) {
      alert("잠시 후에 다시 시도해주세요.");
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (DATA.isAuth === false) {
        // 로그인 유저가 아닐 시
        setValue("");
        return alert("You need to login");
      }

      if (!value.trim()) return;

      let data = {
        writer: DATA._id,
        content: value,
      };

      const getData = async () => {
        try {
          const res = await axios.post("/api/chat/saveChat", data);
          console.log(res);
          let chat = [
            {
              _id: res.data._id,
              writer: {
                _id: DATA._id,
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
    },
    [value]
  );

  const onKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") onSubmit(e);
    },
    [value]
  );

  return (
    <ChatPageContainer>
      <br />
      <h2>This is a Guest Book !</h2>
      <hr />
      <br />
      <Comment comments={comments} setComments={setComments} userData={DATA} />
      <FormBox>
        <form onKeyPress={onKeyPress}>
          <TextArea value={value} onChange={valueHandler} onSubmit={onSubmit} />
          <Button onClick={onSubmit}>Submit</Button>
        </form>
      </FormBox>
    </ChatPageContainer>
  );
};

export default ChatPage;
