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
            // 회원가입 성공시에 팝업창 보여주기
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
      setValidatedEmail(email); // 인증번호를 받고 이메일 주소를 지우거나 다른 것으로 기입할 경우에 대비하여 인증번호를 발송한 이메일 주소를 state에 저장

      const authNumber = async () => {
        try {
          const res = await axiosInstance.post("/api/auth/mail", { email });
          res.data.success && setAuth(res.data.authNum);
        } catch (err) {
          alert("잠시 후에 다시 시도해주세요.");
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
        toast.error("Authentication Number is incorrect"); // 인증번호 불일치시 팝업창으로 보여주기
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
            <span>이메일 주소</span>
            <div>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChangeEmail}
              />
              {!sendMail && (
                <AuthButton onClick={getAuthNum}>인증번호 받기</AuthButton>
              )}
              {emailError && <Error>이메일을 입력해주세요</Error>}
              {sendMail && <Success>인증번호를 전송했습니다.</Success>}
            </div>
          </Label>
          <Label>
            <span>인증번호</span>
            <div>
              <Input value={authNum} onChange={onChangeAuthNum} />
              {!authCheck && (
                <AuthButton onClick={onClickCheckAuthNum}>
                  인증번호 확인
                </AuthButton>
              )}
              {authCheck && <Success>인증이 되었습니다!</Success>}
              {authCheck === false && <Error>인증이 필요합니다.</Error>}
            </div>
            <div></div>
          </Label>
          <Label id="nickname-label">
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
          <Label id="nickname-label">
            <span>닉네임</span>
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
            <span>비밀번호</span>
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
            <span>비밀번호 확인</span>
            <div>
              <Input
                type="password"
                id="password-check"
                name="password-check"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
            </div>
            {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
            {emptyID && <Error>아이디를 입력해주세요.</Error>}
            {shortID && <Error>아이디는 여섯글자 이상이어야 합니다.</Error>}
            {shortPassword && (
              <Error>비밀번호는 여섯글자 이상이어야 합니다.</Error>
            )}
            {!nickname && nickNameCheck && (
              <Error>닉네임을 입력해주세요.</Error>
            )}
            {!password && emptyPassword && (
              <Error>비밀번호를 입력해주세요.</Error>
            )}
          </Label>
          <Button onClick={onSubmit}>회원가입</Button>
        </Form>
        <LinkContainer>
          이미 회원이신가요?&nbsp;
          <Link to="/login">로그인 하러가기</Link>
        </LinkContainer>
      </Container>
      <ToastContainer />
    </Background>
  );
};

export default SignUpPage;
