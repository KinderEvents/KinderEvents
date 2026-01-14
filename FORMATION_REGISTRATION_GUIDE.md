# Guide de Configuration du Système d'Inscription aux Formations

## 📋 Vue d'ensemble

Ce système gère les inscriptions aux formations avec un workflow en 3 statuts:
1. **Demande reçue** - Formulaire rempli, en attente de paiement
2. **Paiement envoyé** - Preuve de paiement envoyée, en attente de validation
3. **Inscription confirmée** - Paiement validé, accès accordé

---

## 🚀 Étapes de Configuration

### 1. Migration de la Base de Données

**Important**: Avant toute chose, appliquez la migration SQL à votre base Supabase.

1. Connectez-vous à [Supabase](https://app.supabase.com)
2. Ouvrez l'éditeur SQL
3. Copiez le contenu de `database/migrations/add_formation_status_fields.sql`
4. Exécutez la migration

Voir `SUPABASE_MIGRATION.md` pour les instructions détaillées.

---

### 2. Configuration des Informations de Paiement

⚠️ **Action Requise**: Vous devez mettre à jour les numéros de paiement dans les fichiers suivants:

#### Fichier: `api/register-formation.js`

Recherchez et remplacez les placeholders:

```javascript
// Ligne ~140-150
<div class="payment-card">
    <div class="payment-logo">📱 Wave</div>
    <div class="payment-number">77 XXX XX XX</div>  // ← Remplacer ici
</div>
<div class="payment-card">
    <div class="payment-logo">🟠 Orange Money</div>
    <div class="payment-number">77 XXX XX XX</div>  // ← Remplacer ici
</div>
```

Et aussi:

```javascript
// Ligne ~160
<div>Envoyez la preuve par <strong>WhatsApp : 77 XXX XX XX</strong> ou par <strong>email : contact@…</strong></div>
// ← Remplacer les numéros et l'email
```

---

### 3. Noms des Formations

Les formations sont actuellement nommées "Formation A" et "Formation B". 

Pour les renommer:

#### Fichier: `src/components/FormationInscriptionForm.jsx`

```javascript
// Ligne ~217-218
<option value="Formation A">Formation A - 5 000 FCFA</option>
<option value="Formation B">Formation B - 10 000 FCFA</option>
```

Remplacez par les vrais noms, par exemple:
```javascript
<option value="Formation A">Marketing Digital - 5 000 FCFA</option>
<option value="Formation B">E-Commerce Avancé - 10 000 FCFA</option>
```

#### Fichier: `api/register-formation.js`

```javascript
// Ligne ~50-53
const formationDetails = {
    'Formation A': { price: 5000, name: 'Formation A - 5 000 FCFA' },
    'Formation B': { price: 10000, name: 'Formation B - 10 000 FCFA' }
};
```

---

### 4. Tester le Système

#### A. Test du Formulaire d'Inscription

1. Démarrez le serveur de développement:
   ```bash
   npm run dev
   ```

2. Naviguez vers: `http://localhost:5173/formation`

3. Cliquez sur "Réserver ma place"

4. Remplissez le formulaire avec des données de test

5. Vérifiez:
   - ✅ Message de confirmation affiché
   - ✅ Email reçu avec instructions de paiement
   - ✅ Inscription dans Supabase avec statut `demande_recue`

#### B. Test de l'Interface Admin

1. Naviguez vers: `http://localhost:5173/admin`

2. Vérifiez:
   - ✅ Liste des inscriptions affichée
   - ✅ Statistiques par statut
   - ✅ Filtres fonctionnels
   - ✅ Recherche opérationnelle

#### C. Test du Workflow de Confirmation

1. Dans l'interface admin, trouvez une inscription avec statut "Demande reçue"

2. Manuellement dans Supabase, changez le statut à `paiement_envoye`:
   ```sql
   UPDATE registrations 
   SET status = 'paiement_envoye' 
   WHERE id = 'ID_DE_TEST';
   ```

3. Dans l'interface admin, cliquez sur "Confirmer" pour cette inscription

4. Vérifiez:
   - ✅ Statut changé à `inscription_confirmee`
   - ✅ Email de confirmation envoyé
   - ✅ Champ `confirmed_at` rempli

---

## 📱 Accès aux Différentes Pages

- **Page de Formation**: `/formation`
- **Interface Admin**: `/admin`
- **Page d'accueil**: `/`

---

## 🔧 API Endpoints Disponibles

### POST `/api/register-formation`
Enregistre une nouvelle inscription

**Body:**
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean@example.com",
  "telephone": "+221701234567",
  "formation": "Formation A"
}
```

### POST `/api/update-registration-status`
Met à jour le statut d'une inscription

**Body:**
```json
{
  "registration_id": "uuid",
  "new_status": "inscription_confirmee",
  "payment_proof_url": "https://..." // optionnel
}
```

### GET `/api/get-registrations`
Récupère les inscriptions avec filtres

**Query params:**
- `status` - Filtrer par statut
- `formation_type` - Filtrer par formation
- `limit` - Nombre de résultats (défaut: 50)
- `offset` - Pagination

---

## 📊 Structure de la Base de Données

### Table: `registrations`

Nouveaux champs ajoutés:

| Champ | Type | Description |
|-------|------|-------------|
| `status` | VARCHAR(50) | Statut du workflow |
| `formation_type` | VARCHAR(100) | Type de formation choisie |
| `payment_proof_url` | TEXT | URL de la preuve de paiement |
| `confirmed_at` | TIMESTAMP | Date de confirmation |

---

## 🎨 Personnalisation des Emails

Les templates d'email se trouvent dans:
- `api/register-formation.js` - Email d'instructions de paiement
- `api/update-registration-status.js` - Email de confirmation

Vous pouvez modifier le HTML directement dans ces fichiers.

---

## 🔒 Sécurité

- ✅ Les clés API Supabase sont côté serveur uniquement
- ✅ Les emails sont envoyés via Nodemailer sécurisé
- ✅ CORS configuré pour la production
- ⚠️ L'interface admin n'a pas d'authentification - à ajouter en production

---

## 📝 Prochaines Étapes Recommandées

1. **Ajouter l'authentification admin** pour sécuriser `/admin`
2. **Upload de preuves de paiement** - permettre aux utilisateurs d'uploader directement
3. **Notifications WhatsApp** - intégrer l'API WhatsApp Business
4. **Logos de paiement** - ajouter les vrais logos Wave et Orange Money
5. **Emails de rappel** - envoyer des rappels automatiques après X jours

---

## 🆘 Support

En cas de problème:
1. Vérifiez les logs de la console navigateur
2. Vérifiez les logs Vercel (si déployé)
3. Vérifiez les données dans Supabase
4. Testez les endpoints API avec Postman

---

**Bon déploiement ! 🚀**
