import fs from 'fs'

export async function writeObjectToFile (path: string, obj: object): Promise<void> {
  fs.writeFileSync(path, JSON.stringify(obj, null, 2), 'utf-8')
}

/**
 * @param  {Element} element
 * @return image `src` or text `textContent`
 */
export async function getDesiredElementContent (element: Element): Promise<string> {
  // element.src throws an error because of external library, can be ignored
  // @ts-expect-error
  return element.src ?? element.textContent
}
