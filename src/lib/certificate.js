import { M5 } from '../content'
import { landscapeSvg } from './scenery'

// Constancia como boleto: paisaje de atardecer arriba, muescas y línea punteada, datos abajo.
const W = 1080
const H = 1350
const PAD = 72 // margen del boleto dentro de la imagen
const CARD = { x: PAD, y: PAD, w: W - PAD * 2, h: H - PAD * 2, r: 64 }
const ART_H = 560 // alto del paisaje dentro del boleto
const NOTCH_R = 34
const COLORS = {
  bg: '#e9eddc',
  card: '#fdfdf8',
  ink: '#262d16',
  inkSoft: '#5f6650',
  accent: '#4a5e12',
  lime: '#d6e08a',
  line: '#d9dcc8',
}
const FONT = '"Archivo", system-ui, sans-serif'

const font = (weight, size, { italic = false } = {}) => `${italic ? 'italic ' : ''}${weight} ${size}px ${FONT}`

/** El shorthand de canvas no acepta porcentajes de ancho: el ancho va aparte (donde exista). */
function setFont(ctx, weight, size, { italic = false, expanded = false } = {}) {
  ctx.font = font(weight, size, { italic })
  if ('fontStretch' in ctx) ctx.fontStretch = expanded ? 'expanded' : 'normal'
}

/** Ajusta el tamaño de letra hasta que el texto quepa en maxWidth. */
function fitText(ctx, text, weight, size, maxWidth, opts) {
  let s = size
  do {
    setFont(ctx, weight, s, opts)
    s -= 2
  } while (ctx.measureText(text).width > maxWidth && s > 28)
}

async function ensureFonts() {
  try {
    await Promise.all([document.fonts.load(font(500, 64)), document.fonts.load(`italic ${font(500, 64)}`), document.fonts.load(font(400, 32))])
  } catch {
    /* si fallan las fuentes se usa la de respaldo */
  }
}

function loadSvg(svg) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  })
}

/** Silueta del boleto: rectángulo redondeado con dos muescas a la altura notchY. */
function ticketPath(ctx, notchY) {
  const { x, y, w, h, r } = CARD
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.lineTo(x + w, notchY - NOTCH_R)
  ctx.arc(x + w, notchY, NOTCH_R, -Math.PI / 2, Math.PI / 2, true)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.lineTo(x, notchY + NOTCH_R)
  ctx.arc(x, notchY, NOTCH_R, Math.PI / 2, -Math.PI / 2, true)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/** Dibuja la constancia y devuelve un data URL JPG. */
export async function renderCertificate({ name, level, levelName, date }) {
  await ensureFonts()
  const t = M5.certificate.image
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  const notchY = CARD.y + ART_H + 40

  ctx.fillStyle = COLORS.bg
  ctx.fillRect(0, 0, W, H)

  // Boleto con sombra suave.
  ctx.save()
  ctx.shadowColor = 'rgba(40, 45, 20, 0.22)'
  ctx.shadowBlur = 60
  ctx.shadowOffsetY = 24
  ticketPath(ctx, notchY)
  ctx.fillStyle = COLORS.card
  ctx.fill()
  ctx.restore()

  // Paisaje recortado por el boleto.
  ctx.save()
  ticketPath(ctx, notchY)
  ctx.clip()
  try {
    const art = await loadSvg(landscapeSvg('atardecer', { width: CARD.w, height: ART_H, seed: 11 }))
    ctx.drawImage(art, CARD.x, CARD.y, CARD.w, ART_H)
  } catch {
    /* sin paisaje la constancia sigue siendo válida */
  }
  ctx.restore()

  // Marca sobre el cielo.
  const cx = W / 2
  ctx.textAlign = 'center'
  ctx.fillStyle = COLORS.ink
  setFont(ctx, 500, 40, { expanded: true })
  ctx.fillText(t.brand, cx, CARD.y + 110)

  // Línea punteada entre muescas.
  ctx.save()
  ctx.setLineDash([14, 12])
  ctx.lineWidth = 4
  ctx.strokeStyle = COLORS.line
  ctx.beginPath()
  ctx.moveTo(CARD.x + NOTCH_R + 24, notchY)
  ctx.lineTo(CARD.x + CARD.w - NOTCH_R - 24, notchY)
  ctx.stroke()
  ctx.restore()

  let y = notchY + 90
  ctx.fillStyle = COLORS.inkSoft
  setFont(ctx, 500, 30)
  ctx.fillText(`${t.kind} · ${t.intro.toLowerCase()}`, cx, y)

  y += 100
  ctx.fillStyle = COLORS.ink
  fitText(ctx, name, 500, 84, CARD.w - 120, { expanded: true })
  ctx.fillText(name, cx, y)

  y += 64
  ctx.fillStyle = COLORS.inkSoft
  setFont(ctx, 400, 30)
  ctx.fillText(t.body, cx, y)

  // Pastilla lima con el nivel.
  y += 70
  const pill = t.level(level, levelName)
  setFont(ctx, 600, 36, { italic: true })
  const pw = ctx.measureText(pill).width + 80
  ctx.fillStyle = COLORS.lime
  ctx.beginPath()
  ctx.roundRect(cx - pw / 2, y, pw, 76, 38)
  ctx.fill()
  ctx.fillStyle = COLORS.accent
  ctx.fillText(pill, cx, y + 50)

  ctx.fillStyle = COLORS.inkSoft
  setFont(ctx, 400, 28)
  ctx.fillText(date, cx, CARD.y + CARD.h - 110)
  setFont(ctx, 400, 24)
  ctx.fillText(t.footer, cx, CARD.y + CARD.h - 66)

  return canvas.toDataURL('image/jpeg', 0.92)
}
