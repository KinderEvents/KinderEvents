# Guide de Développement Local

## Problème: API Endpoints en Développement

Les endpoints API (`/api/*`) sont des fonctions serverless Vercel qui ne fonctionnent pas directement avec `npm run dev` (Vite).

## Solution: Utiliser Vercel Dev

### Option 1: Vercel Dev (Recommandé)

```bash
# Installer Vercel CLI si nécessaire
npm install -g vercel

# Démarrer le serveur de développement Vercel
vercel dev
```

Cela démarre:
- Frontend sur `http://localhost:3000`
- API endpoints fonctionnels sur `http://localhost:3000/api/*`

### Option 2: Vite + Vercel Dev en Parallèle

Terminal 1:
```bash
vercel dev --listen 3000
```

Terminal 2:
```bash
npm run dev
```

Le proxy Vite redirigera les requêtes `/api/*` vers `http://localhost:3000`.

---

## Tester les Endpoints

### Test du Formulaire d'Inscription

1. Démarrez avec `vercel dev`
2. Naviguez vers `http://localhost:3000/formation`
3. Cliquez sur "Réserver ma place"
4. Remplissez et soumettez le formulaire
5. Vérifiez:
   - Message de confirmation affiché
   - Email reçu (si configuré)
   - Données dans Supabase

### Test de l'Interface Admin

1. Naviguez vers `http://localhost:3000/admin`
2. Vérifiez l'affichage des inscriptions

---

## Déploiement

Sur Vercel, tout fonctionne automatiquement:
```bash
vercel --prod
```

Ou via Git push si connecté à GitHub.

---

## Notes

- ✅ En production (Vercel): Les API fonctionnent automatiquement
- ⚠️ En développement (Vite seul): Les API retournent 404
- ✅ En développement (Vercel Dev): Tout fonctionne comme en production
