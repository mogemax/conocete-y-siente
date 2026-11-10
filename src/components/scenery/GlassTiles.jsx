/** Mosaico decorativo de cuadros de vidrio esmerilado. positions: [[left|right, bottom], ...] en px. */
export function GlassTiles({ tiles }) {
  return tiles.map(([side, x, bottom], i) => (
    <span key={i} aria-hidden className="glass-tile" style={{ [side]: x, bottom }} />
  ))
}
