import { M5 } from '../content'

const W = 1080
const H = 1350
const COLORS = {
  paper: '#f8f2e9',
  ink: '#4a2f22',
  inkSoft: '#7a6052',
  clay: '#b4583a',
  line: '#e6d9c8',
  levels: ['#dfe4ee', '#e8e0f1', '#dbe9dc', '#f6e0d0', '#f3e7c4'],
}
const DISPLAY = '"Zen Maru Gothic", sans-serif'
const BODY = '"Atkinson Hyperlegible", sans-serif'

/** Ajusta el tamaño de letra hasta que el texto quepa en maxWidth. */
function fitText(ctx, text, weight, size, family, maxWidth) {
  let s = size
  do {
    ctx.font = `${weight} ${s}px ${family}`
    s -= 2
  } while (ctx.measureText(text).width > maxWidth && s > 24)
}

async function ensureFonts() {
  try {
    await Promise.all([
      document.fonts.load(`900 64px ${DISPLAY}`),
      document.fonts.load(`700 40px ${DISPLAY}`),
      document.fonts.load(`400 32px ${BODY}`),
    ])
  } catch {
    /* si fallan las fuentes se usa la de respaldo */
  }
}

/** Dibuja la constancia y devuelve un data URL JPG. */
export async function renderCertificate({ name, level, levelName, date }) {
  await ensureFonts()
  const t = M5.certificate.image
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = COLORS.paper
  ctx.fillRect(0, 0, W, H)

  // Cinco círculos de nivel, el alcanzado resaltado.
  COLORS.levels.forEach((color, i) => {
    const x = 180 + i * 180
    ctx.beginPath()
    ctx.arc(x, 210, i + 1 === level ? 62 : 44, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
    if (i + 1 === level) {
      ctx.lineWidth = 5
      ctx.strokeStyle = COLORS.clay
      ctx.stroke()
    }
    ctx.fillStyle = COLORS.ink
    ctx.font = `700 34px ${DISPLAY}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(String(i + 1), x, 212)
  })

  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = COLORS.clay
  ctx.font = `700 34px ${DISPLAY}`
  ctx.fillText(t.brand, W / 2, 400)

  ctx.fillStyle = COLORS.ink
  ctx.font = `900 64px ${DISPLAY}`
  ctx.fillText(t.kind, W / 2, 490)

  ctx.strokeStyle = COLORS.line
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(140, 560)
  ctx.lineTo(W - 140, 560)
  ctx.stroke()

  ctx.fillStyle = COLORS.inkSoft
  ctx.font = `400 34px ${BODY}`
  ctx.fillText(t.intro, W / 2, 650)

  ctx.fillStyle = COLORS.ink
  fitText(ctx, name, 900, 84, DISPLAY, W - 160)
  ctx.fillText(name, W / 2, 760)

  ctx.fillStyle = COLORS.inkSoft
  ctx.font = `400 34px ${BODY}`
  ctx.fillText(t.body, W / 2, 850)

  ctx.fillStyle = COLORS.clay
  ctx.font = `700 44px ${DISPLAY}`
  ctx.fillText(t.level(level, levelName), W / 2, 960)

  ctx.fillStyle = COLORS.inkSoft
  ctx.font = `400 32px ${BODY}`
  ctx.fillText(date, W / 2, 1040)

  ctx.font = `400 26px ${BODY}`
  ctx.fillText(t.footer, W / 2, H - 90)

  return canvas.toDataURL('image/jpeg', 0.92)
}

export function downloadDataUrl(dataUrl, filename) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}
