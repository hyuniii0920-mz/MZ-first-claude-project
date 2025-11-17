# 회원가입-로그인 게시판 CRUD 프로젝트

Spring Boot와 TypeScript를 사용한 풀스택 웹 애플리케이션

## 프로젝트 개요

회원가입, 로그인, 게시판 CRUD 기능을 제공하는 웹 애플리케이션입니다.
향후 JWT 인증, 소셜 로그인 등의 기능 확장을 고려하여 설계되었습니다.

## 기술 스택

### Backend
- **Java**: 17
- **Framework**: Spring Boot 3.x
- **Database**: H2 Database (로컬 개발용)
- **Build Tool**: Gradle 또는 Maven
- **ORM**: Spring Data JPA

### Frontend
- **Language**: TypeScript
- **Framework**: React (또는 Vue.js)
- **Build Tool**: Vite
- **Styling**: CSS Modules / Tailwind CSS (디자인 변경 용이)

## 주요 기능

### Phase 1 (현재)
- ✅ 회원가입 (이메일/비밀번호)
- ✅ 로그인/로그아웃
- ✅ 게시판 CRUD
  - 게시글 작성
  - 게시글 목록 조회
  - 게시글 상세 조회
  - 게시글 수정
  - 게시글 삭제

### Phase 2 (향후 추가 예정)
- 🔜 JWT 토큰 기반 인증
- 🔜 소셜 로그인 (Google, Kakao 등)
- 🔜 커스텀 디자인 시스템
- 🔜 프로필 관리
- 🔜 댓글 기능

## 프로젝트 구조

```
MZ-first-claude-project/
├── backend/                # Spring Boot 백엔드
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/board/
│   │   │   │       ├── controller/
│   │   │   │       ├── service/
│   │   │   │       ├── repository/
│   │   │   │       ├── entity/
│   │   │   │       ├── dto/
│   │   │   │       └── config/
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── schema.sql
│   │   └── test/
│   └── build.gradle (or pom.xml)
│
├── frontend/              # TypeScript 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## 설치 및 실행

### 사전 요구사항
- Java 17 이상
- Node.js 18 이상
- npm 또는 yarn

### Backend 실행

```bash
cd backend
./gradlew bootRun
# 또는 Maven 사용 시: ./mvnw spring-boot:run
```

Backend 서버는 `http://localhost:8080`에서 실행됩니다.

### Frontend 실행

```bash
cd frontend
npm install
npm run dev
```

Frontend 개발 서버는 `http://localhost:5173`에서 실행됩니다.

## API 엔드포인트

### 인증 API
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃

### 게시판 API
- `GET /api/posts` - 게시글 목록 조회
- `GET /api/posts/{id}` - 게시글 상세 조회
- `POST /api/posts` - 게시글 작성
- `PUT /api/posts/{id}` - 게시글 수정
- `DELETE /api/posts/{id}` - 게시글 삭제

## 데이터베이스 설정

H2 Database 콘솔은 `http://localhost:8080/h2-console`에서 접근 가능합니다.

기본 설정:
- JDBC URL: `jdbc:h2:mem:boarddb`
- Username: `sa`
- Password: (없음)

## 향후 확장 계획

### JWT 인증 추가
- Spring Security + JWT 토큰 기반 인증
- Access Token / Refresh Token 구조
- 토큰 갱신 로직

### 소셜 로그인
- OAuth 2.0 기반 소셜 로그인
- Google, Kakao, Naver 등 지원
- 기존 회원 연동 기능

### 디자인 시스템
- 컴포넌트 라이브러리 통합 가능
- 테마 시스템 (다크모드 등)
- 반응형 디자인

## 개발 가이드

### 코딩 컨벤션
- Backend: Google Java Style Guide
- Frontend: Airbnb TypeScript Style Guide

### Git 브랜치 전략
- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발 브랜치

## 라이선스

MIT License

## 문의

프로젝트 관련 문의사항이 있으시면 Issues를 통해 남겨주세요.
