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
    const element = await page.$eval(selector, (el) => el)
    return element.textContent
  } catch (error) {
    return null
  }
}
