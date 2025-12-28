# Configuration Brevo (Sendinblue)

## 🎯 Pourquoi Brevo ?
- ✅ **Gratuit** : 300 emails/jour
- ✅ **Pas de domaine requis** : Utilise leur infrastructure
- ✅ **Simple** : Configuration en 5 minutes

## 📝 Étapes de Configuration

### 1. Créer un compte Brevo
1. Allez sur [https://app.brevo.com/account/register](https://app.brevo.com/account/register)
2. Créez votre compte gratuit
3. Confirmez votre email

### 2. Obtenir votre clé API
1. Connectez-vous à [https://app.brevo.com](https://app.brevo.com)
2. Allez dans **Settings** (Paramètres) → **SMTP & API** → **API Keys**
3. Cliquez sur **Create a new API key**
4. Nommez-la "VisionR Website"
5. **Copiez la clé** (elle ressemble à : `xkeysib-xxxxxxxxxxxxx`)

### 3. Configurer dans votre projet

Remplacez `'YOUR_BREVO_API_KEY_HERE'` dans ces 3 fichiers :

#### Fichier 1 : `api/subscribe.js`
```javascript
apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    'xkeysib-votre-clé-ici' // ← Collez votre clé ici
);
```

#### Fichier 2 : `api/send-email.js`
```javascript
apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    'xkeysib-votre-clé-ici' // ← Collez votre clé ici
);
```

### 4. Configurer l'email expéditeur

Dans Brevo, vous devez vérifier un email expéditeur :

1. Allez dans **Senders** → **Add a new sender**
2. Ajoutez votre email (ex: `lambassadegueye@gmail.com`)
3. Confirmez l'email de vérification

Puis mettez à jour dans les fichiers API :
```javascript
sendSmtpEmail.sender = { 
    name: 'VisionR', 
    email: 'lambassadegueye@gmail.com' // ← Votre email vérifié
};
```

## 🚀 Tester

Une fois configuré, testez en :
1. Déployant sur Vercel
2. Remplissant le formulaire Newsletter sur votre site
3. Vérifiant que vous recevez l'email de bienvenue

## 📊 Limites du plan gratuit
- **300 emails/jour** (largement suffisant pour démarrer)
- Emails transactionnels illimités
- Pas de limite de contacts

## 🔄 Migration future vers domaine pro

Quand vous aurez un domaine :
1. Ajoutez votre domaine dans Brevo
2. Configurez les enregistrements DNS (SPF, DKIM)
3. Changez `noreply@visionr.com` par `noreply@votredomaine.com`

---

**Note** : Brevo est parfait pour commencer. Vous pourrez toujours migrer vers un autre service plus tard sans changer votre code (juste la configuration).
