import { useCallback, useState } from "react";
import { Success } from "../LoginPage/style";
import {
  AuthButton,
  Container,
  Background,
  Error,
  H2,
  Form,
  Input,
  Label,
  LinkContainer,
  Button,
} from "./style";
import { Link, useHistory } from "react-router-dom";
import useInput from "../../hooks/useInput";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../redux/store";

const SignUpPage = () => {
  const { currentUser } = useSelector((state: RootState) => state);
  const history = useHistory();

  const [auth, setAuth] = useState(getNum());
  const [authCheck, setAuthCheck] = useState(false);
  const [sendMail, setSendMail] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nickNameCheck, setNickNameCheck] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyID, setEmptyID] = useState(false);
  const [shortID, setShortID] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);

  const [email, onChangeEmail] = useInput("");
  const [validatedEmail, setValidatedEmail] = useState("");
  const [authNum, onChangeAuthNum] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [ID, onChangeID] = useInput("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [mismatchError, setMismatchError] = useState(false);

  function getNum() {
    return Math.random();
  }

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const ValidationCheck = (
    state: string,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (!state.trim()) return setState(true);
    else setState(false);
  };

  const checkIfShort = (
    state: string,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    state.length >= 0 && state.length < 6
      ? setState(() => true)
      : setState(() => false);
  };

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
    if (!authCheck) return;

    ValidationCheck(nickname, setNickNameCheck);
    ValidationCheck(password, setEmptyPassword);
    ValidationCheck(passwordCheck, setEmptyPassword);
    ValidationCheck(ID, setEmptyID);
    checkIfShort(ID, setShortID);
    checkIfShort(password, setShortPassword);

    if (!mismatchError) {
      const data = {
        email: validatedEmail,
        ID,
        name: nickname,
        password,
        image: `http://gravatar.com/avatar/${dayjs(
          new Date(),
        ).unix()}?d=identicon`,
      };

      const getResult = async () => {
        try {
          const res = await axiosInstance.post("/api/users/register", data);
          if (res.data.success) {
            // ???????????? ???????????? ????????? ????????????
            alert("Congratulations, your account has been created");
            history.push("/login");
          } else {
            alert(res.data.msg);
            location.reload();
          }
        } catch (err) {
          console.log(err);
        }
      };

      getResult();
    }
  }, []);

  const getAuthNum = useCallback(
    (e) => {
      e.preventDefault();
      if (!email.trim()) return setEmailError(true);

      setEmailError(false);
      setSendMail(true);
      setValidatedEmail(email); // ??????????????? ?????? ????????? ????????? ???????????? ?????? ????????? ????????? ????????? ???????????? ??????????????? ????????? ????????? ????????? state??? ??????

      const authNumber = async () => {
        try {
          const res = await axiosInstance.post("/api/auth/mail", { email });
          res.data.success && setAuth(res.data.authNum);
        } catch (err) {
          alert("?????? ?????? ?????? ??????????????????.");
        }
      };
      authNumber();
    },
    [email, setAuth],
  );

  const onClickCheckAuthNum = useCallback(
    (e) => {
      e.preventDefault();
      auth === authNum ? setAuthCheck(true) : setAuthCheck(false),
        toast.error("Authentication Number is incorrect"); // ???????????? ???????????? ??????????????? ????????????
    },
    [auth, authNum],
  );

  currentUser && history.push("/");

  return (
    <Background>
      <Container>
        <H2>Sign Up</H2>
        <Form>
          <Label id="email-label">
            <span>????????? ??????</span>
            <div>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChangeEmail}
              />
              {!sendMail && (
                <AuthButton onClick={getAuthNum}>???????????? ??????</AuthButton>
              )}
              {emailError && <Error>???????????? ??????????????????</Error>}
              {sendMail && <Success>??????????????? ??????????????????.</Success>}
            </div>
          </Label>
          <Label>
            <span>????????????</span>
            <div>
              <Input value={authNum} onChange={onChangeAuthNum} />
              {!authCheck && (
                <AuthButton onClick={onClickCheckAuthNum}>
                  ???????????? ??????
                </AuthButton>
              )}
              {authCheck && <Success>????????? ???????????????!</Success>}
              {authCheck === false && <Error>????????? ???????????????.</Error>}
            </div>
            <div></div>
          </Label>
          <Label id="nickname-label">
            <span>?????????</span>
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
          <Label id="nickname-label">
            <span>?????????</span>
            <div>
              <Input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={onChangeNickname}
              />
            </div>
          </Label>
          <Label id="password-label">
            <span>????????????</span>
            <div>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
          </Label>
          <Label id="password-check-label">
            <span>???????????? ??????</span>
            <div>
              <Input
                type="password"
                id="password-check"
                name="password-check"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
            </div>
            {mismatchError && <Error>??????????????? ???????????? ????????????.</Error>}
            {emptyID && <Error>???????????? ??????????????????.</Error>}
            {shortID && <Error>???????????? ???????????? ??????????????? ?????????.</Error>}
            {shortPassword && (
              <Error>??????????????? ???????????? ??????????????? ?????????.</Error>
            )}
            {!nickname && nickNameCheck && (
              <Error>???????????? ??????????????????.</Error>
            )}
            {!password && emptyPassword && (
              <Error>??????????????? ??????????????????.</Error>
            )}
          </Label>
          <Button onClick={onSubmit}>????????????</Button>
        </Form>
        <LinkContainer>
          ?????? ???????????????????&nbsp;
          <Link to="/login">????????? ????????????</Link>
        </LinkContainer>
      </Container>
      <ToastContainer />
    </Background>
  );
};

export default SignUpPage;
