# 프로젝트 이름 : Find Recipe

## 사이트 주소: https://aminiyo-find-recipes.herokuapp.com/

---

## 프로젝트 계획 이유

> 평소에 요리에 흥미가 많고 특히, 외국 음식에 대한 관심이 많기 때문에 외국 음식에 대한 레시피가 간단하게 정리되있는 사이트가 있다면 좋을 것
> 같다는 생각으로 만들게 되었습니다. 외국 음식에 대한 레시피인 만큼 사이트의 언어를 영어로 작성하였습니다.

---

## 풀스택 프로젝트 (개인 프로젝트)

#### 클라이언트(React), 서버(express, mongoDB) 모두 개인적으로 프로젝트를 진행하여 완성하였습니다.

### 프로젝트에 사용한 주요 라이브러리 / 프레임워크

- 클라이언트
  - React, React-redux, @reduxjs/toolkit, Styled-components, Antd, Axios, dayjs, react-toastify, @loadable/component, redux-persist
- 서버
  - express, mongoose, jsonwebtoken, nodemailer, crypto-js, cookie-parser, dotenv

## 주요기능

---

### 검색기능

1. 랜딩페이지 카테고리 목록에서 카테고리 사진 클릭 시 카테고리 관련 음식 목록 리스트 렌더링
2. 검색창을 이용하여 사용하고자 하는 재료 검색 시 재료를 이용하여 만들 수 있는 음식 목록 리스트 렌더링

---

### 음식 레시피 및 조리영상 제공 기능

1. 음식 목록 리스트에서 음식 이미지 클릭 시 레시피 제공
2. 즐겨찾기 추가 (로그인 필요)
3. 조리 영상 제공 (유튜브 API를 활용하여 유튜브 영상 모달에서 시청가능)

---

### 로그인 및 회원가입 기능

1. 이메일을 통한 인증확인 (nodemailer 사용)
2. 중복 이메일을 통한 회원가입 방지
3. 로그인 실패 시 (ID 또는 비밀번호 오류로 인한) react-toastify로 에러 보여주기
