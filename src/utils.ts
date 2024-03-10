import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { TextContent } from './types'

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export const getTextContent = async ({ page, selector }: TextContent) => {
  try {
    return await page.$eval(selector, (el) => el.textContent)
  } catch (error) {
    return null
  }
}

export const saveJSON = async (JSONData: any): Promise<void> => {
  const ROOT_PATH = process.cwd()
  const filePath = path.join(ROOT_PATH, 'data/exchange.json')
  await writeFile(filePath, JSON.stringify(JSONData, null, 2), 'utf-8')
  console.log('🟢 Archivo guardado')
}
