# 프로젝트 이름 : Find Recipe

## 사이트 주소: https://aminiyo-find-recipes.herokuapp.com/

---

## 프로젝트 계획 이유

> ### 평소에 요리에 흥미가 많고 특히, 외국 음식에 대한 관심이 많기 때문에 외국 음식에 대한 레시피가 간단하게 정리되있는 사이트가 있다면 좋을 것

> ### 같다는 생각으로 만들게 되었습니다. 외국 음식에 대한 레시피인 만큼 사이트의 언어를 영어로 작성하였습니다.

---

## 풀스택 프로젝트 (개인 프로젝트)

<img src="https://user-images.githubusercontent.com/73641636/144233370-a7c3cd76-68af-488a-97c1-004f2211526c.png"  width="550px" height="450px" title="홈화면" alt="홈화면"></img><br/>

### 클라이언트(React), 서버(express, mongoDB) 모두 혼자서 진행하여 완성하였습니다.

### 프로젝트에 사용한 주요 라이브러리 / 프레임워크

- 클라이언트
  - React, react-router, React-redux, @reduxjs/toolkit, Styled-components, Antd, Axios, dayjs, react-toastify, @loadable/component, redux-persist,
- 서버
  - express, mongoose, jsonwebtoken, nodemailer, crypto-js, cookie-parser, dotenv

## 파일 구조

---

- 프론트(client 폴더)

  - client/src/index.js 에서 App.js(모든 컴포넌트가 렌더링 되는 파일) 렌더링, 페이지 로딩 시 첫 화면의 컴포넌트는 pages/Landing/index.js 입니다. pages 폴더에는 주요 화면단 컴포넌트들이 위치해 있습니다(로그인, 회원가입 등) 주요 화면단 컴포넌트들의 세부 컴포넌트들은 src/components 파일 안에 위치하고 있습니다.

- 백(server 폴더)
  - server/index.js(main), server/models(DB), server/routes(RestAPI)

---

## 주요기능

---

### 검색기능

1. 랜딩페이지 카테고리 목록에서 카테고리 사진 클릭 시 카테고리 관련 음식 목록 리스트 렌더링
2. 검색창을 이용하여 사용하고자 하는 재료 검색 시 재료를 이용하여 만들 수 있는 음식 목록 리스트 렌더링
   </br>
   </br>
   <img src="https://user-images.githubusercontent.com/73641636/144232321-5ff1dbac-34a2-467e-b5a8-bdb10c41eb30.png" width="525px" height="450px" title="검색기능" alt="검색기능"></img><br/>
   <img src="https://user-images.githubusercontent.com/73641636/144233079-41ca2c30-92e3-437e-a6ab-a93e9b82c0cf.png" width="525px" height="450px" title="목록" alt="목록"></img><br/>

---

### 음식 레시피 및 조리영상 제공 기능

1. 음식 목록 리스트에서 음식 이미지 클릭 시 레시피 제공
2. 즐겨찾기 추가 (로그인 필요)
3. 조리 영상 제공 (유튜브 API를 활용하여 유튜브 영상 모달에서 시청가능)
   </br>
   </br>
   <img src="https://user-images.githubusercontent.com/73641636/144232616-adde110d-4490-4382-9709-fcbddf927a16.png" width="550px" height="450px" title="레시피" alt="레시피"></img><br/>
   <img src="https://i.ibb.co/7WP6gKT/image.png" width="550px" height="450px" title="유튜브" alt="유튜브"></img><br/>

---

### 로그인 및 회원가입 기능

1. 이메일을 통한 인증확인 (nodemailer 사용)
2. 중복 이메일을 통한 회원가입 방지
3. 로그인 실패 시 (ID 또는 비밀번호 오류로 인한) react-toastify로 에러 보여주기
   </br>
   </br>
   <img src="https://user-images.githubusercontent.com/73641636/144232791-1155c77f-651a-4381-a651-b56f5d05e906.png" width="525px" height="450px" title="로그인" alt="로그인"></img><br/>
   <img src="https://user-images.githubusercontent.com/73641636/144233472-b85317a6-58aa-4c4b-aaa0-4d40163a181a.png" width="525px" height="450px" title="이메일 인증" alt="이메일 인증"></img><br/>
   <img src="https://user-images.githubusercontent.com/73641636/144232944-cc81bb90-1b98-42d0-b587-f5ef96719e61.png" width="500px" height="450px" title="토스트" alt="토스트"></img><br/>

---

### 즐겨찾기 목록 관리 기능

1. 즐겨찾기 추가 해놓은 목록 확인 및 antd의 Popover 기능을 사용하여 제목에 마우스 접근 시 사진 보임
2. 즐겨찾기 목록에서 삭제 기능
3. 즐겨찾기 세부 정보 (Recipe) 확인 가능
   </br>
   </br>
   <img src="https://user-images.githubusercontent.com/73641636/144233687-407fcb7a-0470-4df5-9bb3-1d155c830cb3.png" width="550px" height="450px" title="즐겨찾기 목록" alt="즐겨찾기 목록"></img><br/>
   <img src="https://user-images.githubusercontent.com/73641636/144233568-45d27270-da57-4df1-928f-97153a26cc67.png" width="600px" height="450px" title="이미지 보여주기" alt="이미지 보여주기"></img><br/>

---

### 방명록 기능

1. 인피니티 스크롤 기능 (intersection observer 이용) -> 마우스 스크롤 다운으로 현재 데이터의 끝부분 접근 시 방명록 데이터 불러오기
2. 자신이 작성한 방명록 삭제 기능

   </br>
   </br>
   <img src="https://user-images.githubusercontent.com/73641636/144233256-77a11d37-94cb-4060-b2ef-0d4d1a0a2492.png" width="550px" height="450px" title="방명록" alt="방명록"></img><br/>

---

# 프로젝트를 진행하며 어려웠던 점 및 느낀점

---

> 1. ### 처음 상태관리를 Redux 사용법을 잘 모르기도 하고 사용하기가 두려워 SWR를 이용하여 진행 하였었다. 하지만, 상태관리의 불편함을 느껴 Redux와 Redux toolkit을 적용하기로 결심한 결과, 리덕스를 적용하는 과정에서 많은 어려움을 겪었다(actionCreate, store 등등). 하지만, 이 과정을 통해 Redux 사용에 대한 두려움을 극복하고, 자신감을 얻을 수 있었습니다.

> 2. ### 회원가입 및 로그인 기능 구현 시 유효성 검사를 해야 한다는 것을 배웠고, 유효성 검사의 중요성을 깨닫게 되었다.

> 3. ### 이전까지는 하나의 컴포넌트 당 단 하나의 useEffect만 사용해야 하는 줄 알았지만, 그렇지 않다는 것을 알게 되었고, 디펜던시에 어떤 값이 들어가야하고 그것들이 어떠한 역할을 하는지 알게 되었다.

> 4. ## 이번 프로젝트 경험을 통해 React, Javascript, CSS, HTML에 대해 자신감을 갖게 되었고, 특히 React 작동법에 대해 많은 걸 배울 수 있는 좋은 계기가 되었다. 또한, express, monogoDB 및 클라이언트와 서버의 데이터 통신 흐름 등 전반적인 지식과 경험을 쌓을 수 있었다.

---
