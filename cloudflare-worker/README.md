# Worker del chat inteligente Lu4

Proxy de Groq para que la API key no viva en el navegador (útil si compartes la guía con amigos).

## Deploy

```bash
cd cloudflare-worker
npx wrangler login
npx wrangler secret put GROQ_API_KEY
npx wrangler deploy
```

Copia la URL `https://….workers.dev` y pégala en la guía → **Chat inteligente** → campo worker.

## Uso sin worker

En [console.groq.com/keys](https://console.groq.com/keys) crea una key `gsk_…` y pégala en la guía. Si el navegador bloquea CORS, usa este worker.
