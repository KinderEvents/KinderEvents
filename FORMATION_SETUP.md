# Configuration EmailJS pour Formation BOOST E-COMMERCE IA

## 📧 Configuration de l'envoi d'emails

Les inscriptions sont envoyées automatiquement à **eventskinder@gmail.com** via EmailJS.

### Étapes de configuration :

#### 1. Créer un compte EmailJS
- Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
- Créez un compte gratuit (jusqu'à 200 emails/mois)

#### 2. Configurer un service email
- Dans le dashboard, allez dans "Email Services"
- Cliquez sur "Add New Service"
- Choisissez votre fournisseur d'email (Gmail recommandé)
- Connectez votre compte **eventskinder@gmail.com**
- Notez le **Service ID** généré

#### 3. Créer un template email
- Allez dans "Email Templates"
- Cliquez sur "Create New Template"
- Utilisez ce template :

```
Sujet: Nouvelle Inscription - BOOST E-COMMERCE IA

Bonjour,

Vous avez reçu une nouvelle inscription à la formation BOOST E-COMMERCE IA :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 INFORMATIONS DU CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Nom: {{name}}
🏪 Boutique: {{boutique}}
📱 WhatsApp: {{whatsapp}}
💼 Pack choisi: {{pack}}

📅 Date d'inscription: {{timestamp}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Prochaines étapes :
1. Contacter le client sur WhatsApp
2. Confirmer le paiement (Wave ou Orange Money)
3. Envoyer l'accès à la formation

Cordialement,
Système d'inscription automatique
```

- Dans les paramètres du template :
  - **To Email**: {{to_email}} (ou directement eventskinder@gmail.com)
  - Variables: name, boutique, whatsapp, pack, timestamp, to_email
- Notez le **Template ID** généré

#### 4. Obtenir votre Public Key
- Allez dans "Account" > "General"
- Copiez votre **Public Key**

#### 5. Mettre à jour le fichier de configuration
Ouvrez `/src/config/emailConfig.js` et remplacez :

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'votre_service_id',      // Remplacer
  TEMPLATE_ID: 'votre_template_id',    // Remplacer
  PUBLIC_KEY: 'votre_public_key',      // Remplacer
  TO_EMAIL: 'eventskinder@gmail.com'   // Déjà configuré
};
```

---

## 🚀 Déploiement sur Vercel

### Option 1 : Déploiement automatique (Recommandé)

1. **Pushez votre code sur GitHub**
```bash
git add .
git commit -m "Add Formation landing page with EmailJS integration"
git push origin main
```

2. **Vercel détectera automatiquement les changements** et déploiera la nouvelle version

3. **Vérifiez le déploiement**
- Allez sur [https://vercel.com/dashboard](https://vercel.com/dashboard)
- Vérifiez que le déploiement est réussi
- Testez la page : `https://visionr-studio.vercel.app/formation`

### Option 2 : Déploiement manuel

```bash
# Construire le projet
npm run build

# Déployer avec Vercel CLI
vercel --prod
```

---

## ✅ Vérification

Après le déploiement, testez :

1. **Page d'accueil** : Vérifiez que la bannière Formation apparaît
2. **Page Formation** : `https://visionr-studio.vercel.app/formation`
3. **Formulaire** : Testez une inscription
4. **Email** : Vérifiez que vous recevez l'email sur eventskinder@gmail.com

---

## 🔒 Sécurité

- ✅ L'email de destination (eventskinder@gmail.com) est caché dans le template EmailJS
- ✅ Seules les clés publiques sont exposées côté client
- ✅ Les clés privées restent sur EmailJS
- ✅ Limite de 200 emails/mois sur le plan gratuit

---

## 📱 Test local

Pour tester en local :

```bash
npm run dev
```

Puis visitez :
- http://localhost:5173/ (page d'accueil avec bannière)
- http://localhost:5173/formation (page complète)

---

## 🎨 Images générées

Les images mockup ont été automatiquement copiées dans `/public` :
- `formation-preview.png` - Utilisée dans la bannière homepage
- `formation-pricing.png` - Mockup de la section pricing
- `formation-modules.png` - Mockup des modules

---

## 📞 Support

En cas de problème :
1. Vérifiez les logs de la console navigateur
2. Vérifiez les logs EmailJS dans le dashboard
3. Assurez-vous que les clés sont correctement configurées
4. Vérifiez que le compte EmailJS est actif

---

**Bon déploiement ! 🚀**
