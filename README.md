배포 완료
UX/UI 디자인 수정예정

https://xmasnotetree.vercel.app/

최신 커밋 수정본 프론트/백엔드 아래

프론트:
https://github.com/kannikii/christmas-tree-backend.git

백엔드:
https://github.com/kannikii/christmas-tree-backend.git

# Christmas Tree Note

프론트(React/Vite)와 백엔드(Express/MySQL)로 만든 크리스마스 트리 메모/댓글 서비스입니다. 공용/개인 트리 생성, 장식(노트)·댓글·좋아요, 관리자 모드(숨김/삭제/차단/로그)를 제공합니다.

## 기술 스택
- Frontend: React 19, React Router, Vite, axios, react-snowfall
- Backend: Node.js, Express 5, MySQL2, Passport(Google OAuth), bcrypt, express-session + express-mysql-session
- Infra: Vercel(프론트), Railway(백엔드), MySQL 8/9

## 주요 기능
- 로그인: 로컬 회원가입/로그인(비밀번호 bcrypt 해시), Google OAuth
- 트리: 공용/개인 트리 생성, 개인 트리는 공유 키로 초대, 참여 중복 방지
- 노트: 트리별 최대 10개 제한, 위치 정보와 메시지 저장, 작성/수정/삭제, 관리자 숨김/표시/삭제
- 댓글: 작성/수정/삭제, 관리자 숨김/표시/삭제
- 좋아요: 중복 방지(`INSERT IGNORE`), 취소/카운트
- 관리자: 사용자 차단/해제, 관리자 로그(admin_log) 조회, 특정 사용자 노트/댓글 열람
- 트랜잭션/락: 노트 생성 시 트리 행 `FOR UPDATE`로 직렬화, 관리자 액션 전반에 트랜잭션 적용

## 백엔드 실행 (christmas-tree-backend/)
```bash
cd christmas-tree-backend
npm install
npm run start          # 또는 nodemon app.js
```

필수 환경변수(.env 예시):
```
PORT=3000
FRONTEND_URL=http://localhost:5173
SESSION_SECRET=your_session_secret

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=christmas_db

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

DB 스키마: `christmasTreeNoteDB.sql` 참고 (user, tree, member_tree, note, comment, like_note, admin_log, sessions 등).

## 프론트엔드 실행 (christmas-tree-frontend/client/)
```bash
cd christmas-tree-frontend/client
npm install
npm run dev    # http://localhost:5173
```

필수 환경변수(.env):
```
VITE_API_URL=http://localhost:3000    # 배포 시 Railway 백엔드 URL로 설정
```

## 배포 메모
- Vercel: `VITE_API_URL` 환경변수 설정, `vercel.json`에 Vite 빌드 설정 포함.
- Railway: `FRONTEND_URL`을 Vercel 도메인으로 맞추고(CORS), DB 접속 환경변수 세팅.

## 폴더 구조(상위)
```
christmas-tree-backend/   # Express API 서버
christmas-tree-frontend/  # Vite 기반 React 클라이언트
christmasTreeNoteDB.sql   # MySQL 스키마 덤프
```


<img width="637" height="842" alt="image" src="https://github.com/user-attachments/assets/af286b26-1d57-435d-873c-8a9a9c5b4f43" />

<img width="1320" height="2514" alt="image" src="https://github.com/user-attachments/assets/c39fe7f7-49bb-4ebe-9f71-14fb95c3d8a5" />

<img width="639" height="849" alt="image" src="https://github.com/user-attachments/assets/0cc060ed-cc4c-4950-8b46-a19611f18e97" />

<img width="1134" height="474" alt="스크린샷 2025-12-11 오후 7 11 15" src="https://github.com/user-attachments/assets/b469b180-52ea-4b21-8a5a-d9817e8461dc" />
