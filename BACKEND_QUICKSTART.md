# 🎯 Backend API - Guide de Configuration Rapide

## ✅ Ce qui a été créé

1. **`/api/submit-formation.js`** - Fonction serverless Vercel
   - Reçoit les données du formulaire
   - Envoie un email HTML professionnel via Gmail
   - Gère les erreurs et la validation

2. **Frontend mis à jour** - `Formation.jsx` utilise maintenant `/api/submit-formation`

3. **Nodemailer installé** - Package pour l'envoi d'emails

## 🔧 Configuration Requise

### Vous devez configurer le mot de passe Gmail

#### Option 1: Pour tester localement

1. **Générez un mot de passe d'application Gmail** :
   - Allez sur https://myaccount.google.com/apppasswords
   - Connectez-vous avec **eventskinder@gmail.com**
   - Créez un mot de passe pour "Vercel Formation API"
   - Copiez le mot de passe (16 caractères)

2. **Mettez à jour `.env.local`** :
   ```bash
   # Ouvrez le fichier
   nano .env.local
   
   # Remplacez la ligne EMAIL_PASS par:
   EMAIL_PASS=votre_mot_de_passe_copié_ici
   ```

3. **Testez localement** :
   ```bash
   npx vercel dev
   # Ouvrez http://localhost:3000/formation
   # Testez le formulaire
   ```

#### Option 2: Pour déployer directement en production

1. **Générez le mot de passe d'application** (même étape que ci-dessus)

2. **Configurez sur Vercel** :
   - Allez sur https://vercel.com/dashboard
   - Sélectionnez votre projet
   - Settings → Environment Variables
   - Ajoutez:
     - `EMAIL_USER` = `eventskinder@gmail.com`
     - `EMAIL_PASS` = `[votre mot de passe d'application]`

3. **Déployez** :
   ```bash
   npm run build
   npx vercel deploy --prod --yes
   ```

## 📧 Format de l'Email

Vous recevrez un email HTML professionnel avec :
- En-tête violet avec gradient
- Nom du client
- Boutique (si fourni)
- Numéro WhatsApp
- Pack choisi (Standard 5k ou PRO 10k)
- Date et heure (timezone Dakar)

## 🚀 Prochaines Étapes

**Choisissez votre option :**

### A. Test Local d'abord
```bash
# 1. Configurez .env.local avec le mot de passe Gmail
# 2. Lancez le serveur local
npx vercel dev

# 3. Testez sur http://localhost:3000/formation
```

### B. Déploiement Direct
```bash
# 1. Configurez les variables sur Vercel dashboard
# 2. Déployez
npm run build && npx vercel deploy --prod --yes
```

---

**Voir BACKEND_SETUP.md pour les instructions détaillées**
