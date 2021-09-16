import fs from 'fs'

export async function writeObjectToFile(path: string, obj: object): Promise<void> {
  fs.writeFileSync(path, JSON.stringify(obj, null, 2), 'utf-8')
}