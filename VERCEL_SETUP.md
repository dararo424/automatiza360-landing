# Configuración de Vercel — Automatiza360 Landing

## Variables de entorno requeridas en producción

Ir a Vercel: **Project Settings → Environment Variables** y agregar:

| Variable | Valor producción | Notas |
|----------|------------------|-------|
| `VITE_APP_URL` | `https://app.automatiza360.com` | URL del SaaS al que redirige el CTA |
| `VITE_API_URL` | `https://api.automatiza360.com` | Backend para el analizador de negocio |
| `VITE_META_PIXEL_ID` | `<tu pixel id>` | Sacar de Events Manager → Pixel → Settings |

Sin `VITE_META_PIXEL_ID` el tracking de conversión queda apagado.
Sin `VITE_APP_URL` el botón "Empezar" se queda apuntando a `localhost:5173`.

## Si la build falla con "permission denied"

El binario de Vite pierde permisos al restaurar caché. Solución actual: `package.json` usa `node ./node_modules/vite/bin/vite.js build`. Si vuelve a fallar:

1. Vercel dashboard → tu proyecto → Settings → Build Cache → **Purge**
2. Re-deploy.

## Dominio

- Apuntar `automatiza360.co` (y `www`) a Vercel.
- En Vercel: Project Settings → Domains → agregar ambos.
