import { isMeasureComplete } from '../lib/scoring'

/** Lo que falta para la constancia. Cada entrada apunta al paso donde se resuelve. */
export function missingForCertificate(state) {
  const missing = []
  if (!isMeasureComplete(state.measures.pre)) missing.push({ key: 'pre', stepId: 'antes-nivel' })
  if (!isMeasureComplete(state.measures.post)) missing.push({ key: 'post', stepId: 'despues-nivel' })
  if (!state.area.trim()) missing.push({ key: 'area', stepId: 'm5-area' })
  if (!state.ifThen.when.trim() || !state.ifThen.then.trim()) missing.push({ key: 'ifThen', stepId: 'm5-si-entonces' })
  return missing
}

export const finalLevel = (state) => state.measures.post.level ?? state.measures.pre.level ?? 2
