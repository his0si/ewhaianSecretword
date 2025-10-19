# 🍀 이화이언 비밀단어 TF

해당 프로젝트는 비밀 단어 TF로서 비밀 단어를 안전하게 공유하고, 11월 5일에 열리는 이화이언 오프라인 행사 '이화담'을 효과적으로 홍보하기 위해 기획되었습니다.

[🍀사이트 바로 가기](https://ewhasecret.com)

<table>
  <tr>
    <td width="20%">
      <img src="https://github.com/user-attachments/assets/6b6e5790-0e35-453c-a8fb-a6acad96dd86" width="100%" alt="screenshot 1"/>
    </td>
    <td width="20%">
      <img src="https://github.com/user-attachments/assets/4a997bb1-b8ac-4364-8e2a-fe0f2fce6236" width="100%" alt="screenshot 2"/>
    </td>
    <td width="20%">
      <img src="https://github.com/user-attachments/assets/fd36b44d-4ea7-4ae1-894d-33f4197066be" width="100%" alt="screenshot 3"/>
    </td>
    <td width="20%">
      <img src="https://github.com/user-attachments/assets/afacfa19-5e8a-4814-a4cc-32a8c4522cbd" width="100%" alt="screenshot 4"/>
    </td>
    <td width="20%">
      <img src="https://github.com/user-attachments/assets/967e21e4-7593-42f7-8821-b8f4f001f122" width="100%" alt="screenshot 5"/>
    </td>
  </tr>
  <tr>
    <td width="20%">
      <img src="https://github.com/user-attachments/assets/58210801-8f81-448f-be8e-3f8f3edd3616" width="100%" alt="screenshot 6"/>
    </td>
    <td width="20%">
      <img src="https://github.com/user-attachments/assets/107a294e-2901-49f4-a3a5-0d7c550cfddb" width="100%" alt="screenshot 7"/>
    </td>
    <td width="20%">
      <img src="https://github.com/user-attachments/assets/c03b30ff-c3a9-4313-b145-95d2825c4f61" width="100%" alt="screenshot 8"/>
    </td>
    <td width="20%">
      <img src="https://github.com/user-attachments/assets/30ee6a6b-af9c-49e3-97a4-b28bffc86674" width="100%" alt="screenshot 9"/>
    </td>
    <td width="20%">
      <img src="https://github.com/user-attachments/assets/97bd682d-261a-4cc8-9a54-033c83c4c294" width="100%" alt="screenshot 10"/>
    </td>
  </tr>
</table>


## 팀원

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/his0si.png" width="80"/><br/>
      <b>김희서</b><br/>
      FE
    </td>
    <td align="center">
      <img src="https://github.com/Eomsuhyeon.png" width="80"/><br/>
      <b>엄수현</b><br/>
      FE
    </td>
    <td align="center">
      <img src="https://github.com/SweetFriedPotato.png" width="80"/><br/>
      <b>최지희</b><br/>
      BE
    </td>
  </tr>
</table>


## 시스템 아키텍처

```
┌─────────────────────────────────────────────────────┐
│                   Internet (HTTPS)                  │
└───────────────────┬─────────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │   Nginx Reverse Proxy │ (80/443)
        │   + Let's Encrypt SSL │
        └───────────┬───────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌──────────────┐        ┌──────────────┐
│   Frontend   │        │   Backend    │
│  (React SPA) │        │  (Express)   │
│    (3000)    │        │    (3001)    │
└──────────────┘        └──────┬───────┘
                               │
                               ▼
                        ┌──────────────┐
                        │  PostgreSQL  │
                        │   Database   │
                        │    (5432)    │
                        └──────────────┘
```

##  주요 기능

### 이화인 인증 시스템
-   **이메일 도메인 제한**: `@ewhain.net` 또는 `@ewha.ac.kr` 이메일만 가입 가능
-   **비밀단어 인증**: 회원가입 시 유레카의 자유게시판에 게시된 비밀단어를 정확히 입력해야 진행 가능
-   **이메일 인증**: Gmail SMTP를 통한 이메일 발송 및 JWT 기반 인증 링크 검증

### 퀴즈
-   **타이머 기능**: 커스텀 React Hook(`useQuizTimer`)을 활용한 실시간 시간 측정
-   **진행률 표시**: 현재 문제 번호와 전체 진행도를 시각적으로 표시 (예: `3/18`)
-   **초성 힌트**: 카드 형태로 제공되는 힌트와 직관적인 UI
-   **복수 정답 처리**: 대소문자 및 공백을 무시하고, 여러 형태의 정답을 인정 (예: '스타벅스', '스벅')
-   **무제한 재도전**: 여러 번 퀴즈를 풀어 기록 갱신 가능

### 상세 결과 페이지
-   **점수 및 시간 표시**: 맞춘 문제 개수와 소요 시간을 함께 표시
-   **문항별 정답/오답 표**: 힌트와 정답은 노출하지 않고 O/X만 표시하여 비밀번호 유출 방지 (오프라인 행사를 통해서만 정답을 확인할 수 있습니다)
-   **이벤트 연계**: 퀴즈 완료 후 이화이언 행사 Padlet 링크 제공

### 개인 기록 관리 (MyRecord)
-   **전체 시도 기록**: 모든 퀴즈 시도 이력을 시간순으로 확인 가능
-   **상세 정보**: 각 시도별 점수, 소요 시간, 제출 일시 표시
-   **기록 상세 보기**: 특정 시도를 클릭하면 해당 회차의 O/X 결과 확인 가능

### 실시간 랭킹 리더보드
-   **2단계 정렬**: 1순위 맞춘 개수, 2순위 소요 시간 (동점자는 빠른 시간이 우선)
-   **사용자별 최고 기록**: 여러 시도 중 가장 높은 점수만 랭킹에 반영
-   **내 순위 강조**: 로그인한 사용자의 순위를 자동으로 하이라이트
-   **TOP 100**: 상위 100명의 랭킹만 표시

### 이벤트 홍보
-   퀴즈 결과 페이지에서 이화이언 행사 Padlet로 바로 이동 가능

## 데이터베이스 스키마 (DB Schema)

### `users` (사용자 테이블)

| Column        | Type         | 제약 조건           | 설명                               |
| :------------ | :----------- | :----------------- | :--------------------------------- |
| `id`          | `SERIAL`     | `PRIMARY KEY`      | 고유 ID (자동 증가)                |
| `email`       | `VARCHAR(255)` | `UNIQUE NOT NULL` | 이메일 (이화인 이메일만 허용)       |
| `password`    | `VARCHAR(255)` | `NOT NULL`        | 비밀번호 (bcrypt 해싱)             |
| `nickname`    | `VARCHAR(100)` | `UNIQUE NOT NULL` | 닉네임 (리더보드 표시용)            |
| `is_verified` | `BOOLEAN`    | `DEFAULT FALSE`    | 이메일 인증 여부                    |
| `created_at`  | `TIMESTAMP`  | `DEFAULT NOW()`    | 계정 생성일                         |

### `quiz_results` (퀴즈 결과 테이블)

| Column        | Type         | 제약 조건           | 설명                                         |
| :------------ | :----------- | :----------------- | :------------------------------------------- |
| `id`          | `SERIAL`     | `PRIMARY KEY`      | 고유 ID (자동 증가)                          |
| `user_id`     | `INTEGER`    | `REFERENCES users(id) ON DELETE CASCADE` | 사용자 ID (외래 키) |
| `score`       | `INTEGER`    | `NOT NULL`         | 맞춘 문제 개수                                |
| `duration`    | `INTEGER`    | `DEFAULT 0`        | 퀴즈 소요 시간 (초 단위)                      |
| `answers`     | `JSONB`      | -                  | 문항별 정답 여부 JSON (예: `[{"question":1,"isCorrect":true}]`) |
| `submitted_at`| `TIMESTAMP`  | `DEFAULT NOW()`    | 퀴즈 제출 시각                                |


## 환경 변수 설정

### 루트 디렉토리 `.env.prod` (SSL 설정용)
```env
DOMAIN_NAME=your-domain.com
SSL_EMAIL=your-email@example.com
VITE_API_BASE_URL=https://your-domain.com
```

### `ewhaianSecretword/client/.env.prod` (프론트엔드)
```env
VITE_API_BASE_URL=https://your-domain.com
```

### `ewhaianSecretword_back/.env.prod` (백엔드)
```env
# 데이터베이스 설정
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name
DATABASE_URL=postgresql://your_db_user:your_db_password@db:5432/your_db_name

# JWT 설정
JWT_SECRET=your_jwt_secret_key

# 이메일 설정 (Gmail SMTP)
MAIL_USER=your-email@gmail.com
MAIL_PASS=your_gmail_app_password

# 회원가입 비밀단어
SECRET_WORD_FOR_REGISTER=your_secret_word

# URL 설정
SERVER_URL=https://your-domain.com/api
FRONTEND_URL=https://your-domain.com

# 포트 설정
PORT=3001
```

**주의사항:**
-   Gmail SMTP 사용 시 [앱 비밀번호](https://support.google.com/accounts/answer/185833)를 발급받아 사용하세요.
-   `DATABASE_URL`의 호스트는 Docker Compose 서비스명(`db`)을 사용합니다.

## 배포 가이드

### 사전 준비
1.  도메인 DNS A 레코드를 서버 IP로 설정
2.  서버에 Docker 및 Docker Compose 설치
3.  방화벽에서 80, 443, 3001 포트 개방

### 배포 순서

#### 1단계: 백엔드 + 데이터베이스 배포
```bash
cd ewhaianSecretword_back
docker compose -f docker-compose.prod.yml up -d
```
-   PostgreSQL 컨테이너가 먼저 시작되고 헬스체크 통과 후 백엔드 시작
-   `init_db.js`가 자동 실행되어 테이블 생성

#### 2단계: SSL 인증서 발급
```bash
cd ..
chmod +x setup-ssl.sh
./setup-ssl.sh
```
-   Let's Encrypt를 통해 무료 SSL 인증서 자동 발급
-   `.env.prod`에 설정된 `DOMAIN_NAME`과 `SSL_EMAIL` 사용
-   인증서는 `ssl/` 디렉토리에 저장

#### 3단계: 프론트엔드 + Nginx 배포
```bash
docker compose -f docker-compose.prod.yml up -d
```
-   React 앱 빌드 및 Nginx 컨테이너 시작
-   HTTPS 리버스 프록시 설정 적용

### 배포 확인
```bash
# 컨테이너 상태 확인
docker ps

# 백엔드 로그 확인
docker logs ewhaian-app

# 프론트엔드 로그 확인
docker logs ewhaian-frontend

# Nginx 로그 확인
docker logs ewhaian-nginx

# 데이터베이스 연결 테스트
curl https://your-domain.com/api/db-test
```

### SSL 인증서 갱신
Let's Encrypt 인증서는 90일 유효합니다. Cron을 통해 자동 갱신 설정을 권장합니다:
```bash
0 0 1 * * certbot renew --quiet && docker compose -f /path/to/docker-compose.prod.yml restart nginx
```

## 프로젝트 구조

```
ewhaianSecretword/
├── client/                     # 프론트엔드 (React)
│   ├── src/
│   │   ├── api/               # API 통신 함수
│   │   ├── components/        # 재사용 컴포넌트
│   │   ├── hooks/             # 커스텀 React Hooks
│   │   ├── pages/             # 페이지 컴포넌트
│   │   ├── styles/            # 스타일 정의
│   │   └── utils/             # 유틸리티 함수
│   ├── Dockerfile             # 프론트엔드 Docker 이미지
│   └── nginx.conf             # Nginx 설정
├── docker-compose.prod.yml    # 프론트엔드 + Nginx
├── nginx.conf                 # 리버스 프록시 설정
├── setup-ssl.sh               # SSL 자동 설정 스크립트
└── ssl/                       # SSL 인증서 저장

ewhaianSecretword_back/
├── routes/                    # API 라우트
│   ├── users.js              # 회원가입/로그인/인증
│   ├── quiz.js               # 퀴즈 문제/제출
│   └── leaderboard.js        # 랭킹 조회
├── middleware/
│   └── auth.js               # JWT 인증 미들웨어
├── db.js                     # PostgreSQL 연결
├── init_db.js                # 데이터베이스 초기화
├── quizdata.js               # 퀴즈 문제 데이터
├── index.js                  # Express 서버 진입점
├── Dockerfile                # 백엔드 Docker 이미지
└── docker-compose.prod.yml   # 백엔드 + PostgreSQL
```

## 라이센스

본 프로젝트는 이화여자대학교 이화이언 커뮤니티를 위해 제작되었습니다.
