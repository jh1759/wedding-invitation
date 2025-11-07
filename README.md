<<<<<<< HEAD
# 웹 청첩장

React + Vite + TypeScript + Tailwind CSS로 제작된 단일 페이지 웹 청첩장입니다.

## 주요 기능

- 🎨 미니멀하고 세련된 디자인
- 📱 완전 반응형 (모바일 최적화)
- 🌙 다크 모드 지원
- ♿ 접근성 최우선 (WCAG 준수)
- ⚡ 최적화된 성능 (Lighthouse 90+ 목표)
- 🎭 부드러운 애니메이션 (prefers-reduced-motion 지원)

## 섹션 구성

1. **히어로 섹션**: 신랑·신부 이름, 결혼식 날짜/시간
2. **소개 섹션**: 초대 문구
3. **일정/장소 섹션**: 예식장 정보 및 지도 링크
4. **갤러리 섹션**: 썸네일 그리드 + 모달 뷰어
5. **참석 여부 (RSVP) 섹션**: 참석 신청 폼
6. **양가 계좌 안내**: 계좌 정보 및 복사 기능
7. **푸터**: 연락처 및 공유 기능

## 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Tailwind CSS** - 유틸리티 CSS 프레임워크
- **Zod** - 스키마 유효성 검증
- **React Hook Form** - 폼 관리
- **Lucide React** - 아이콘

## 시작하기

### 사전 요구사항

- Node.js 18+ 
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
npm run build
```

빌드 결과물은 `dist` 폴더에 생성됩니다.

### 미리보기

```bash
npm run preview
```

빌드된 결과물을 로컬에서 미리볼 수 있습니다.

### 린팅 및 포맷팅

```bash
# 린팅
npm run lint

# 포맷팅
npm run format
```

## 데이터 커스터마이징

`src/data/sample.ts` 파일을 수정하여 청첩장 정보를 변경할 수 있습니다:

```typescript
export const sampleData: WeddingData = {
  couple: {
    groomName: '신랑 이름',
    brideName: '신부 이름',
  },
  wedding: {
    date: '2026-05-24',
    time: '14:00',
    hall: '예식장 이름',
    address: '주소',
    // ...
  },
  // ...
}
```

## 이미지 추가

1. `public/sample-images/` 폴더에 이미지 파일 추가
2. `src/data/sample.ts`의 `gallery` 배열에 이미지 정보 추가:

```typescript
gallery: [
  {
    id: '1',
    src: '/sample-images/photo1.jpg',
    alt: '사진 설명',
    thumbnail: '/sample-images/photo1-thumb.jpg', // 선택사항
  },
  // ...
]
```

## 배포

### GitHub Pages

1. `vite.config.ts`에서 `base` 설정:

```typescript
export default defineConfig({
  base: '/wedding-invitation/', // 저장소 이름
  // ...
})
```

2. GitHub Actions 또는 수동으로 배포:

```bash
npm run build
# dist 폴더의 내용을 gh-pages 브랜치에 푸시
```

### S3 + CloudFront

1. 빌드:

```bash
npm run build
```

2. `dist` 폴더의 내용을 S3 버킷에 업로드
3. CloudFront 배포 설정

### 환경 변수

`.env` 파일을 생성하여 `BASE_URL`을 설정할 수 있습니다:

```env
BASE_URL=/
```

## 접근성

- 시맨틱 HTML 태그 사용
- ARIA 레이블 및 역할 명시
- 키보드 네비게이션 지원
- `prefers-reduced-motion` 미디어 쿼리 지원
- 적절한 색상 대비

## 성능 최적화

- 이미지 lazy loading
- 코드 스플리팅
- 최적화된 빌드 결과물
- Lighthouse 90+ 점수 목표

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 라이선스

MIT

## 기여

이슈 및 풀 리퀘스트를 환영합니다!

=======
# wedding-invitation
>>>>>>> 0930514fdbe449b388053525b78d170c2607376f
