export interface News {
  title: string
  md5: string
  content: string
  image: string
  dateModified: string
}

/** https://stackoverflow.com/questions/51237668/typescript-declare-that-all-properties-on-an-object-must-be-of-the-same-type */
export interface NewsContent {
  [key: string]: string[]
}
