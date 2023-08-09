import type { Page } from 'playwright'

export interface TextContent {
  page: Page
  selector: string
}
