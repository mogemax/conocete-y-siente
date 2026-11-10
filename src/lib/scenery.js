// Ilustraciones vectoriales (paisaje en capas y nubes) como cadenas SVG.
// Una sola fuente para la interfaz (componentes React) y para la constancia (canvas).

// Una paleta por hora del día: el recorrido va del amanecer (Módulo 1) al atardecer (Módulo 5).
export const SCENES = {
  amanecer: {
    farA: '#cdc6ef', farB: '#aca7df', snow: '#f6e3e6', lake: '#bccaf0', lakeHi: '#f3d9de',
    hill: '#93ab6c', meadow: '#aec45f', near: '#6f8c37', pine: '#34502a', rock: '#aaa5cb', rockHi: '#cbc6e6',
    flowerA: '#ffffff', flowerB: '#f6d38a', cloud: '#fff7f0', cloudSh: '#c3bfee', cloudHi: '#f9cda6',
  },
  manana: {
    farA: '#c4c6f0', farB: '#9fa3dc', snow: '#f4ecf4', lake: '#a9bff0', lakeHi: '#ebe6f6',
    hill: '#8aa75c', meadow: '#acc556', near: '#668732', pine: '#2f4d26', rock: '#a4a5ca', rockHi: '#c8c8e6',
    flowerA: '#ffffff', flowerB: '#f5da82', cloud: '#fffaf4', cloudSh: '#c6c6f0', cloudHi: '#fbdcbb',
  },
  mediodia: {
    farA: '#b3bdee', farB: '#8f9bd9', snow: '#f1f4ff', lake: '#93b3ee', lakeHi: '#e3ecff',
    hill: '#82a34c', meadow: '#a9c64b', near: '#5f8228', pine: '#2b4a22', rock: '#9ea4c8', rockHi: '#c5cae6',
    flowerA: '#ffffff', flowerB: '#f3e07a', cloud: '#ffffff', cloudSh: '#c9cdf2', cloudHi: '#fde7cf',
  },
  atardecer: {
    farA: '#e9bccb', farB: '#b49ccc', snow: '#fbd9cf', lake: '#e6b7bd', lakeHi: '#fbe0c8',
    hill: '#8f9a48', meadow: '#b5b450', near: '#6a7a2c', pine: '#33421f', rock: '#b4a0c0', rockHi: '#d8c4d8',
    flowerA: '#fff4e4', flowerB: '#f6b97e', cloud: '#fff1e4', cloudSh: '#c9a3d7', cloudHi: '#f7b88a',
  },
}

export const SCENE_BY_MODULE = { m1: 'amanecer', m2: 'manana', m3: 'manana', m4: 'mediodia', m5: 'atardecer' }

const f1 = (n) => +n.toFixed(1)

function peaks(list, t, base) {
  // Montañas facetadas: cara de luz, cara de sombra y nieve.
  return list
    .map(
      ([x, y, w]) =>
        `<path d="M${x - w} ${base}L${x} ${y}L${x} ${base}Z" fill="${t.farA}"/>` +
        `<path d="M${x} ${y}L${f1(x + w * 1.1)} ${base}L${x} ${base}Z" fill="${t.farB}"/>` +
        `<path d="M${x} ${y}L${f1(x - w * 0.22)} ${f1(y + w * 0.3)}L${f1(x - w * 0.05)} ${f1(y + w * 0.24)}L${f1(x + w * 0.08)} ${f1(y + w * 0.33)}L${f1(x + w * 0.25)} ${f1(y + w * 0.27)}Z" fill="${t.snow}" opacity=".9"/>`,
    )
    .join('')
}

function pine(x, y, h, t) {
  const w = h * 0.42
  return `<g fill="${t.pine}"><path d="M${x} ${y - h}L${f1(x + w * 0.55)} ${f1(y - h * 0.55)}L${f1(x - w * 0.55)} ${f1(y - h * 0.55)}Z"/><path d="M${x} ${f1(y - h * 0.78)}L${f1(x + w * 0.8)} ${f1(y - h * 0.25)}L${f1(x - w * 0.8)} ${f1(y - h * 0.25)}Z"/><path d="M${x} ${f1(y - h * 0.5)}L${f1(x + w)} ${y}L${f1(x - w)} ${y}Z"/></g>`
}

function flowers(t, seed, y0, y1, n) {
  let s = seed
  let out = ''
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280
  for (let i = 0; i < n; i++) {
    const x = rnd() * 390
    const y = y0 + rnd() * (y1 - y0)
    const r = 1.4 + rnd() * 1.8
    out += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${rnd() > 0.3 ? t.flowerA : t.flowerB}"/>`
  }
  return out
}

function rock(x, y, k, t) {
  return `<path d="M${x} ${y}q${f1(8 * k)} -${f1(22 * k)} ${f1(30 * k)} -${f1(24 * k)}q${f1(22 * k)} -2 ${f1(30 * k)} ${f1(24 * k)}Z" fill="${t.rock}"/><path d="M${f1(x + 8 * k)} ${f1(y - 12 * k)}q${f1(10 * k)} -${f1(10 * k)} ${f1(22 * k)} -${f1(11 * k)}q-${f1(4 * k)} ${f1(6 * k)} -${f1(22 * k)} ${f1(11 * k)}Z" fill="${t.rockHi}"/>`
}

/**
 * Paisaje en capas (viewBox 390×300, anclado abajo):
 * cordillera lejana → cordillera facetada → lago → colinas → pradera → frente con pinos.
 */
export function landscapeSvg(scene, { mountains = true, lake = true, seed = 7, width = '100%', height = '100%' } = {}) {
  const t = SCENES[scene]
  const m = mountains
  const far = `<path d="M0 118L28 96L52 108L84 78L112 100L140 88L170 104L196 84L232 106L262 92L300 104L336 80L362 98L390 90V170H0Z" fill="${t.farA}" opacity=".55"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 300" width="${width}" height="${height}" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">${
    m ? far + peaks([[48, 92, 58], [150, 74, 72], [250, 96, 56], [322, 58, 80]], t, 162) : ''
  }${
    m && lake
      ? `<path d="M0 160H390V196H0Z" fill="${t.lake}"/><path d="M150 168h110M118 176h160M176 184h60" stroke="${t.lakeHi}" stroke-width="2.5" stroke-linecap="round" opacity=".85"/>`
      : ''
  }<path d="M0 ${m ? 186 : 120}C60 ${m ? 170 : 104} 120 ${m ? 182 : 118} 170 ${m ? 192 : 128}C220 ${m ? 202 : 138} 270 ${m ? 180 : 112} 390 ${m ? 176 : 108}V300H0Z" fill="${t.hill}"/><path d="M0 214C70 194 150 224 230 210C300 198 350 202 390 194V300H0Z" fill="${t.meadow}"/>${flowers(t, seed, 218, 246, 24)}<path d="M0 242C80 228 150 258 250 248C320 242 360 236 390 230V300H0Z" fill="${t.near}"/>${rock(30, 268, 1.1, t)}${rock(296, 258, 0.85, t)}${pine(16, 236, 86, t)}${pine(48, 242, 60, t)}${pine(354, 228, 98, t)}${pine(382, 238, 64, t)}${flowers(t, seed + 3, 258, 298, 32)}</svg>`
}

let cloudId = 0
const PUFFS = [[34, 70, 22], [62, 54, 30], [100, 40, 38], [140, 50, 32], [172, 64, 24], [196, 74, 14], [84, 72, 26], [124, 74, 26]]

/** Cúmulo de 3 tonos: borde durazno arriba, cuerpo claro, sombra lila abajo; recortado por su silueta. */
export function cloudSvg(scene, { width = 220 } = {}) {
  const t = SCENES[scene]
  const id = `nube${cloudId++}`
  const set = (dx, dy, k, fill) => PUFFS.map(([x, y, r]) => `<circle cx="${x + dx}" cy="${y + dy}" r="${f1(r * k)}" fill="${fill}"/>`).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 100" width="${width}" height="${f1((width * 100) / 220)}" aria-hidden="true" focusable="false"><defs><clipPath id="${id}">${set(0, 0, 1, '#000')}</clipPath><clipPath id="${id}b"><rect width="220" height="88"/></clipPath></defs><g clip-path="url(#${id}b)"><g clip-path="url(#${id})"><rect width="220" height="100" fill="${t.cloudSh}"/>${set(-4, -10, 1, t.cloudHi)}${set(3, 1, 0.93, t.cloud)}</g></g><path d="M4 88C40 84 70 86 110 86C150 86 190 84 216 88C180 92 60 93 4 88Z" fill="${t.cloudSh}" opacity=".8"/></svg>`
}
