import { useCallback, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Error,
  Label,
  Input,
  LinkContainer,
  Button,
  Header,
  Container,
} from "./style";
import useInput from "../../hooks/useInput";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { loginSet } from "../../redux/userRedux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../redux/store";

const LoginPage = () => {
  const history = useHistory();
  const [ID, onChangeID] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [emptyCheck, setEmptyCheck] = useState<boolean>(false);
  const { currentUser, isFetching, error } = useSelector(
    (state: RootState) => state,
  );
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!ID.trim() || !password.trim()) return setEmptyCheck(true);
      setEmptyCheck(false);
      login(dispatch, { ID, password });
    },
    [ID, password, history],
  );

  useEffect(() => {
    dispatch(loginSet());
    error && toast.error("Check your ID and Password", { autoClose: 2500 });
  }, [error]);

  currentUser && history.push("/");

  return (
    <Container>
      <Header>Login</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>아이디</span>
          <div>
            <Input
              type="text"
              id="ID"
              name="ID"
              value={ID}
              onChange={onChangeID}
            />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
          {emptyCheck && <Error>아이디와 비밀번호를 모두 작성해주세요.</Error>}
        </Label>
        <Button type="submit" disabled={isFetching}>
          로그인
        </Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/register">회원가입 하러가기</Link>
      </LinkContainer>
      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
