import { useEffect } from 'react'
import { useStore } from '../state/store'
import { buildResultRecord, sendRecord } from '../lib/sheets'
import { missingForCertificate } from './requirements'
import { CERTIFICATE_INDEX } from './steps'

/**
 * Envía el registro anónimo de resultados una sola vez, al llegar a la constancia con todo completo.
 * Si falla la red, se reintenta la próxima vez que se abra la app.
 */
export function useAutoSubmit() {
  const { state, set } = useStore()
  const ready = state.furthest >= CERTIFICATE_INDEX && missingForCertificate(state).length === 0

  useEffect(() => {
    if (!ready || state.sent.result) return
    let cancelled = false
    sendRecord(buildResultRecord(state, true)).then((ok) => {
      if (ok && !cancelled) set(['sent', 'result'], true)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo debe dispararse al cumplirse la condición
  }, [ready, state.sent.result])
}
