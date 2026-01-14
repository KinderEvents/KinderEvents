# Fix: "Unexpected end of JSON input" Error

## Problème

L'erreur `Failed to execute 'json' on 'Response': Unexpected end of JSON input` se produit car les endpoints API retournent un 404 avec un body vide en développement local.

## Cause

Les fichiers dans `/api/*` sont des **fonctions serverless Vercel** qui ne sont pas servies par Vite (`npm run dev`). Vite ne sait pas comment exécuter ces fonctions Node.js.

## Solution

### Option 1: Utiliser Vercel Dev (Recommandé)

```bash
# Installer Vercel CLI globalement
npm install -g vercel

# Démarrer le serveur de développement Vercel
vercel dev
```

Cela démarre le serveur sur `http://localhost:3000` avec:
- ✅ Frontend React
- ✅ API endpoints fonctionnels
- ✅ Environnement identique à la production

### Option 2: Vite + Vercel Dev en Parallèle

**Terminal 1** (API):
```bash
vercel dev --listen 3000
```

**Terminal 2** (Frontend):
```bash
npm run dev
```

Le proxy Vite (configuré dans `vite.config.js`) redirige `/api/*` vers `http://localhost:3000`.

### Option 3: Déployer sur Vercel

Si vous ne voulez pas installer Vercel CLI:

```bash
# Pousser sur Git (si connecté à Vercel)
git add .
git commit -m "Add formation registration system"
git push

# Ou déployer directement
vercel --prod
```

Sur Vercel, tout fonctionne automatiquement sans configuration.

---

## Fichiers Modifiés

### [`vite.config.js`](file:///Users/mac/Downloads/ai%20agency/vite.config.js)

Ajout du proxy pour rediriger les requêtes API:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

---

## Vérification

Une fois `vercel dev` démarré:

1. Naviguez vers `http://localhost:3000/formation`
2. Cliquez sur "Réserver ma place"
3. Remplissez le formulaire
4. Soumettez → Vous devriez voir le message de confirmation
5. Vérifiez l'email reçu (si configuré)
6. Vérifiez les données dans Supabase

---

## En Production

Sur Vercel, aucune configuration supplémentaire n'est nécessaire. Les API fonctionnent automatiquement.
