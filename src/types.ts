export interface News {
  title: string | null
  content: string | null
  image: string | null
  dateModified: string | null
}

/** https://stackoverflow.com/questions/51237668/typescript-declare-that-all-properties-on-an-object-must-be-of-the-same-type */
export interface NodeListMap {
  [NodeListName: string]: NodeList
}
