import 'dotenv/config'
import axios from 'axios'
import playwright from 'playwright'
import { EXCHANGE_SELECTOR } from './constants'
import { formatDate, getTextContent, saveJSON } from './utils'

;(async () => {
  const API_URL = process.env.API_URL
  const DOF_EXCHANGE_URL = 'https://dof.gob.mx/indicadores_detalle.php?cod_tipo_indicador=158&'
  const date = formatDate(new Date())
  const encondedDate = encodeURIComponent(date)
  const URL = `${DOF_EXCHANGE_URL}dfecha=${encondedDate}&hfecha=${encondedDate}#gsc.tab=0`
  const SECRET = process.env.SECRET

  if (!API_URL) {
    throw new Error('🔴 No se ha configurado la URL de la API')
  }

  if (!SECRET) {
    throw new Error('🔴 No se ha configurado el secreto')
  }

  const browser = await playwright.chromium.launch({
    headless: true
  })

  const page = await browser.newPage()
  await page.goto(URL)

  const exchangeText = await getTextContent({ page, selector: EXCHANGE_SELECTOR })

  await browser.close()

  if (!exchangeText) {
    throw new Error('🔴 No se pudo obtener el tipo de cambio')
  }

  const exchange = Number(exchangeText)

  if (isNaN(exchange)) {
    throw new Error('🔴 Error al convertir el tipo de cambio')
  }

  await axios.post(API_URL, { exchange }, { headers: { authorization: SECRET } })

  console.log(`🟢 ${date}: Tipo de cambio actualizado a $${exchange}`)

  const id = new Date().getTime()

  await saveJSON({ id, date, exchange })
})()
