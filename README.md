# 프로젝트 이름 : Find Recipe

## 사이트 주소: https://aminiyo-find-recipes.herokuapp.com/

---

## 프로젝트 계획 이유

> 평소에 요리에 흥미가 많고 특히, 외국 음식에 대한 관심이 많기 때문에 외국 음식에 대한 레시피가 간단하게 정리되있는 사이트가 있다면 좋을 것
> 같다는 생각으로 만들게 되었습니다. 외국 음식에 대한 레시피인 만큼 사이트의 언어를 영어로 작성하였습니다.

---

## 풀스택 프로젝트 (개인 프로젝트)

<img src="https://i.ibb.co/S6vdsMm/image.png"  width="525px" height="450px" title="검색기능" alt="검색기능"></img><br/>

### 클라이언트(React), 서버(express, mongoDB) 모두 개인적으로 프로젝트를 진행하여 완성하였습니다.

#### 클라이언트 파일 위치 -> server/client

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
   </br>
   </br>
   <img src="https://i.ibb.co/crP9GFf/image.png" width="525px" height="450px" title="검색기능" alt="검색기능"></img><br/>
   <img src="https://i.ibb.co/7pCdrrc/image.png" width="525px" height="450px" title="목록" alt="목록"></img><br/>

---

### 음식 레시피 및 조리영상 제공 기능

1. 음식 목록 리스트에서 음식 이미지 클릭 시 레시피 제공
2. 즐겨찾기 추가 (로그인 필요)
3. 조리 영상 제공 (유튜브 API를 활용하여 유튜브 영상 모달에서 시청가능)
   </br>
   </br>
   <img src="https://i.ibb.co/PN8sb15/image.png" width="525px" height="450px" title="검색기능" alt="검색기능"></img><br/>
   <img src="https://i.ibb.co/7WP6gKT/image.png" width="525px" height="450px" title="검색기능" alt="검색기능"></img><br/>

---

### 로그인 및 회원가입 기능

1. 이메일을 통한 인증확인 (nodemailer 사용)
2. 중복 이메일을 통한 회원가입 방지
3. 로그인 실패 시 (ID 또는 비밀번호 오류로 인한) react-toastify로 에러 보여주기
   </br>
   </br>
   <img src="https://i.ibb.co/2gZYcpF/image.png" width="525px" height="450px" title="검색기능" alt="검색기능"></img><br/>
   <img src="https://i.ibb.co/HDTjpN9/image.png" width="525px" height="450px" title="검색기능" alt="검색기능"></img><br/>
   <img src="https://i.ibb.co/NZL5dGP/toastify.png" width="525px" height="450px" title="검색기능" alt="검색기능"></img><br/>

---

### 즐겨찾기 목록 관리 기능

1. 즐겨찾기 추가 해놓은 목록 확인 및 antd의 Popover 기능을 사용하여 제목에 마우스 접근 시 사진 보임
2. 즐겨찾기 목록에서 삭제 기능
3. 즐겨찾기 세부 정보 (Recipe) 확인 가능
   </br>
   </br>
   <img src="https://i.ibb.co/JdNwPN5/image.png" width="600px" height="450px" title="검색기능" alt="검색기능"></img><br/>
   <img src="https://i.ibb.co/Zxp6ccc/image.png" width="525px" height="450px" title="검색기능" alt="검색기능"></img><br/>

---

### 방명록 기능

1. 인피니티 스크롤 기능 (intersection observer 이용) -> 마우스 스크롤 다운으로 현재 데이터의 끝부분 접근 시 방명록 데이터 불러오기
2. 자신이 작성한 방명록 삭제 기능

   </br>
   </br>
   <img src="https://i.ibb.co/JvPrJGK/image.png" width="600px" height="450px" title="검색기능" alt="검색기능"></img><br/>

---

# 프로젝트를 진행하며 어려웠던 점 및 느낀점

---

> 1. ### 처음 상태관리를 Redux 사용법을 잘 모르기도 하고 사용하기가 두려워 SWR를 이용하여 진행 하였었습니다. 하지만, 상태관리의 불편함을 느껴 Redux와 Redux toolkit을 적용하기로 결심한 결과, 리덕스를 적용하는 과정에서 많은 어려움을 겪었습니다(actionCreate, store 등등). 하지만, 이 과정을 통해 Redux 사용에 대한 두려움을 극복하고, 자신감을 얻을 수 있었습니다.

> 2. ### 회원가입 및 로그인 기능 구현 시 유효성 검사를 해야 한다는 것을 배웠고, 유효성 검사의 중요성을 깨닫게 되었습니다.

> 3. ### 이전까지는 하나의 컴포넌트 당 단 하나의 useEffect만 사용해야 하는 줄 알았지만, 그렇지 않다는 것을 알게 되었고, 디펜던시에 어떤 값이 들어가야하고 그것들이 어떠한 역할을 하는지 알게 되었습니다.

> 4. ## 이번 프로젝트 경험을 통해 React, Javascript, CSS, HTML에 대해 자신감을 갖게 되었고, 특히 React 작동법에 대해 많은 걸 배울 수 있는 좋은 계기가 되었습니다. 또한, express, monogoDB 및 클라이언트와 서버의 데이터 통신 흐름 등 전반적인 지식과 경험을 쌓을 수 있었습니다.

---
