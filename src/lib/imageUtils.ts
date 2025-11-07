/**
 * 이미지 경로에서 확장자를 자동으로 찾아서 반환
 * @param basePath - 확장자 없는 이미지 경로 (예: '/sample-images/1')
 * @returns 확장자가 포함된 이미지 경로 (예: '/sample-images/1.jpg')
 */
export function getImagePath(basePath: string): string {
  // 이미 확장자가 있으면 그대로 반환
  if (basePath.match(/\.(jpg|jpeg|png|gif|webp|jfif|svg)$/i)) {
    return basePath
  }

  // 첫 번째로 시도할 확장자 (jpg가 가장 일반적)
  return `${basePath}.jpg`
}

/**
 * 이미지 소스를 확장자와 함께 반환 (fallback 지원)
 * @param basePath - 확장자 없는 이미지 경로
 * @returns ImageSource 객체
 */
export function getImageSource(basePath: string): { src: string; fallbacks: string[] } {
  if (basePath.match(/\.(jpg|jpeg|png|gif|webp|jfif|svg)$/i)) {
    return { src: basePath, fallbacks: [] }
  }

  const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'jfif', 'svg']
  const fallbacks = extensions.map(ext => `${basePath}.${ext}`)
  
  return {
    src: fallbacks[0], // jpg를 기본으로
    fallbacks: fallbacks.slice(1)
  }
}

