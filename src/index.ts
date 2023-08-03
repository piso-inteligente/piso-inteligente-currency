import { formatDate } from './utils'

;(async () => {
  const DOF_EXCHANGE_URL = 'https://dof.gob.mx/indicadores_detalle.php?cod_tipo_indicador=158&'
  const date = formatDate(new Date())
  const encondedDate = encodeURIComponent(date)
  const URL = `${DOF_EXCHANGE_URL}dfecha=${encondedDate}&hfecha=${encondedDate}#gsc.tab=0`

  console.log(URL)
})()
