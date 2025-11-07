import type { WeddingData } from '../types'

export const sampleData: WeddingData = {
  couple: {
    groomName: '신재훈',
    brideName: '박연정',
  },
  wedding: {
    date: '2026-05-24',
    time: '14:00',
    hall: '서울 웨딩컨벤션 3F 루체홀',
    address: '서울시 강남구 테헤란로 123',
  },
  message: [
    '저희 두 사람이 하나가 되는 뜻깊은 날,',
    '소중한 발걸음으로 축복해 주시면',
    '따뜻한 마음으로 함께해 주세요.',
  ],
  gallery: [
    {
      id: '1',
      src: '/sample-images/1.jpg',
      alt: '사진 1',
    },
    {
      id: '2',
      src: '/sample-images/2.jpg',
      alt: '사진 2',
    },
    {
      id: '3',
      src: '/sample-images/3.jpg',
      alt: '사진 3',
    },
    {
      id: '4',
      src: '/sample-images/4.jpg',
      alt: '사진 4',
    },
    {
      id: '5',
      src: '/sample-images/5.jpg',
      alt: '사진 5',
    },
    {
      id: '6',
      src: '/sample-images/6.jfif',
      alt: '사진 6',
    },
  ],
  accounts: [
    {
      title: '신랑측',
      name: '신재훈',
      bank: '국민',
      number: '123456-01-000000',
    },
    {
      title: '신부측',
      name: '박연정',
      bank: '신한',
      number: '110-123-456789',
    },
  ],
}

