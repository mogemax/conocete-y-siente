# Conócete y siente

Experiencia digital autoguiada (máx. 60 min, mobile-first) para desarrollar **autoconocimiento** en alumnos de primer semestre.
Proyecto de *Desarrollo de Competencias Personales (FHU002)*, Universidad Panamericana. Equipo: Esteban Amezcua, Nadia Villegas y Esteban Montes.

- Stack: Vite + React + Tailwind CSS v4. Sin backend.
- El progreso se guarda en `localStorage` (se puede salir y volver).
- Al llegar a la constancia se envía **un registro anónimo** a Google Sheets (sin nombres ni textos libres). La encuesta opcional se envía aparte, marcada como opinión.

## Editar textos

Todo el texto vive en `src/content/`, un archivo por módulo:

| Archivo | Qué contiene |
|---|---|
| `ui.js` | Botones, mensaje de apoyo (contacto psicológico = **TODO**), `SHOW_TODOS` |
| `levels.js` | 5 niveles, tips por nivel y sugerencias del plan de 4 semanas |
| `instrument.js` | Las 6 afirmaciones y las 3 situaciones de medición (antes y después) |
| `m1.js` … `m5.js` | Contenido de cada módulo |

Busca `TODO(equipo)` para ver lo pendiente. Mientras `SHOW_TODOS = true` (en `ui.js`), los pendientes se ven en pantalla con la etiqueta "Pendiente".

El **orden de las pantallas** está en `src/flow/steps.jsx`.

## Correr en local

```bash
npm install
npm run dev
```

Para probar el envío a Sheets en local, crea `.env.local` con `VITE_SHEETS_URL=...` (ver `.env.example`).

## Recolección de datos (Google Sheets + Apps Script)

### 1. Crear la hoja y el script

1. Crea un Google Sheet nuevo (por ejemplo "Conócete y siente · datos").
2. Menú **Extensiones → Apps Script**. Borra lo que haya y pega:

```js
// Recibe registros de la experiencia y los agrega como filas.
// Crea las pestañas "resultados" y "opinion" y sus encabezados automáticamente.
function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const data = JSON.parse(e.postData.contents)
    const name = data.hoja === 'opinion' ? 'opinion' : 'resultados'
    delete data.hoja

    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = ss.getSheetByName(name) || ss.insertSheet(name)

    let headers = sheet.getLastRow() > 0
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      : []
    const newKeys = Object.keys(data).filter((k) => !headers.includes(k))
    if (newKeys.length) {
      headers = headers.concat(newKeys)
      sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    }

    sheet.appendRow(headers.map((h) => (data[h] === undefined || data[h] === null ? '' : data[h])))
    return ContentService.createTextOutput('ok')
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err)
  } finally {
    lock.releaseLock()
  }
}
```

### 2. Publicarlo como Web App

1. **Implementar → Nueva implementación** → tipo **Aplicación web**.
2. *Ejecutar como*: **Yo**. *Quién tiene acceso*: **Cualquier persona**.
3. Autoriza los permisos y copia la URL que termina en `/exec`.

> Si usan una cuenta institucional y **no aparece "Cualquier persona"**, el administrador de la UP lo tiene bloqueado: hagan el Sheet y el script con una cuenta de Gmail personal.
> Cada vez que cambien el código del script hay que crear una **nueva versión** de la implementación (Implementar → Administrar implementaciones → editar → Nueva versión); la URL no cambia.

### 3. Probarlo

Con la URL, en una terminal:

```bash
curl -L -X POST -d '{"hoja":"resultados","id":"prueba","fecha":"hoy"}' "TU_URL/exec"
```

Debe aparecer una fila en la pestaña `resultados`. Bórrala antes de la prueba real.

### Columnas que se envían

**resultados** (una fila por persona que llega a la constancia):
`id` (aleatorio), `fecha`, `version`, `participante` (`companero` / `externo`),
`antes_nivel`, `antes_a1`…`antes_a6`, `antes_s1`…`antes_s3` (nivel 1-4 de la opción elegida),
`antes_prom_afirmaciones`, `antes_prom_situaciones`, `antes_aciertos` (situaciones con opción de nivel 3 o 4),
las mismas columnas con prefijo `despues_`,
`juego_r1_intento1`, `juego_r1_intento2` … `juego_r3_intento2`, `completo`.

**opinion** (opcional): `id` (el mismo), `fecha`, `version`, `participante`, `utilidad` (1-5), `que_aprendiste`, `que_haras_distinto`, `que_mejorarias`.

Nunca se envían: nombre, check-in, mapa personal, valores, meta, compromiso ni plan. Eso se queda en el celular.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube el proyecto a la rama `main`.
2. En el repo: **Settings → Pages → Source: GitHub Actions**.
3. **Settings → Secrets and variables → Actions → pestaña Variables → New repository variable**:
   `VITE_SHEETS_URL` = la URL `/exec` del paso anterior.
4. Cada `push` a `main` publica solo (workflow en `.github/workflows/deploy.yml`).
   La liga queda como `https://<usuario>.github.io/<nombre-del-repo>/`.

> La ruta base se calcula sola con el nombre del repo (`VITE_BASE`). Si cambian el nombre del repo, no hay que tocar nada.
> La URL del Sheet no es secreta (termina dentro del código del navegador); por eso solo se envían datos anónimos.

### Alternativa: Vercel

Importa el repo en vercel.com, agrega la variable `VITE_SHEETS_URL` en *Settings → Environment Variables* y despliega. No necesita `VITE_BASE`.

## Reglas de la constancia

Se desbloquea al llegar al final con: medición inicial y final completas (nivel + 6 afirmaciones + 3 situaciones), área a trabajar y compromiso "Si…, entonces…". La imagen JPG se genera en el navegador; el nombre no se envía a ningún lado.

## Estructura

```
src/
  content/      textos (lo único que el equipo necesita editar)
  flow/         orden de pantallas, navegación, reglas de la constancia, envío automático
  state/        estado global + guardado en localStorage
  lib/          cálculos, envío a Sheets, constancia (canvas), portapapeles
  components/   ui/ (botones, escalas, opciones), layout/ (marco y pie), blocks/ (rueda, tarjetas, gráfica)
  screens/      pantallas de cada módulo
```
