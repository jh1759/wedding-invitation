export interface Couple {
  groomName: string
  brideName: string
  coupleImage?: string
  groomImage?: string
  brideImage?: string
}

export interface Wedding {
  date: string
  time: string
  hall: string
  address: string
  floor?: string
  mapUrl?: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  thumbnail?: string
}

export interface Account {
  title: string
  name: string
  bank: string
  number: string
}

export interface RSVPFormData {
  name: string
  guestCount: number
  contact: string
  message: string
}

export interface WeddingData {
  couple: Couple
  wedding: Wedding
  message: string | string[]
  gallery: GalleryImage[]
  accounts: Account[]
}

export interface Comment {
  id: string
  name: string
  content: string
  password: string
  createdAt: string
}
