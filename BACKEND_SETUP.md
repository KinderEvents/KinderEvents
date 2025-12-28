# Configuration Backend - Variables d'Environnement

## 📧 Configuration Gmail pour eventskinder@gmail.com

### Étape 1: Activer la validation en 2 étapes

1. Connectez-vous à https://myaccount.google.com avec **eventskinder@gmail.com**
2. Allez dans **Sécurité**
3. Activez la **Validation en deux étapes** si ce n'est pas déjà fait

### Étape 2: Générer un mot de passe d'application

1. Allez sur https://myaccount.google.com/apppasswords
2. Dans "Sélectionner une application", choisissez **Mail**
3. Dans "Sélectionner un appareil", choisissez **Autre (nom personnalisé)**
4. Entrez le nom: **Vercel Formation API**
5. Cliquez sur **Générer**
6. **Copiez le mot de passe** (16 caractères sans espaces)

### Étape 3: Ajouter les variables d'environnement sur Vercel

#### Via le Dashboard Vercel:

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet **visionr-studio**
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez les variables suivantes:

| Name | Value | Environment |
|------|-------|-------------|
| `EMAIL_USER` | `eventskinder@gmail.com` | Production, Preview, Development |
| `EMAIL_PASS` | `[mot de passe d'application]` | Production, Preview, Development |

5. Cliquez sur **Save**

#### Via la ligne de commande (alternative):

```bash
# Ajouter EMAIL_USER
vercel env add EMAIL_USER

# Quand demandé:
# - Value: eventskinder@gmail.com
# - Environment: Production, Preview, Development

# Ajouter EMAIL_PASS
vercel env add EMAIL_PASS

# Quand demandé:
# - Value: [votre mot de passe d'application]
# - Environment: Production, Preview, Development
```

### Étape 4: Créer un fichier .env.local pour le développement local

Créez le fichier `/Users/mac/Downloads/ai agency/.env.local`:

```env
EMAIL_USER=eventskinder@gmail.com
EMAIL_PASS=votre_mot_de_passe_application_ici
```

⚠️ **Important**: Ce fichier est déjà dans `.gitignore` et ne sera jamais commité.

---

## 🧪 Tester Localement

```bash
# Démarrer le serveur de développement Vercel
npx vercel dev

# Le serveur démarre sur http://localhost:3000
# Testez le formulaire sur http://localhost:3000/formation
```

---

## 🚀 Déployer sur Vercel

Une fois les variables d'environnement configurées:

```bash
# Build et deploy
npm run build
npx vercel deploy --prod --yes
```

Ou simplement pusher sur GitHub si le projet est lié:

```bash
git add .
git commit -m "Add backend API for form submissions"
git push origin main
```

Vercel déploiera automatiquement avec les variables d'environnement configurées.

---

## ✅ Vérification

Après le déploiement:

1. Allez sur votre site en production
2. Remplissez le formulaire de formation
3. Vérifiez que vous recevez un email sur **eventskinder@gmail.com**
4. L'email devrait avoir un format HTML professionnel avec toutes les informations

---

## 🔒 Sécurité

✅ Les credentials Gmail sont stockés dans les variables d'environnement Vercel  
✅ Jamais exposés dans le code source  
✅ Jamais commités dans Git  
✅ Accessibles uniquement par les fonctions serverless  
✅ Chiffrés par Vercel

---

## 📝 Format de l'Email Reçu

Vous recevrez un email HTML formaté avec:
- En-tête avec gradient violet
- Nom du client
- Nom de la boutique (si fourni)
- Numéro WhatsApp
- Pack choisi (Standard ou PRO)
- Date et heure d'inscription (timezone Dakar)

---

**Prêt à configurer ? Suivez les étapes ci-dessus !** 🚀
