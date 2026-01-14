# Migration de la Base de Données Supabase

## Instructions pour Appliquer la Migration

### Option 1: Via l'Interface Supabase (Recommandé)

1. **Connectez-vous à Supabase**
   - Allez sur [https://app.supabase.com](https://app.supabase.com)
   - Sélectionnez votre projet

2. **Ouvrez l'Éditeur SQL**
   - Dans le menu latéral, cliquez sur "SQL Editor"
   - Cliquez sur "New Query"

3. **Copiez et Exécutez la Migration**
   - Ouvrez le fichier `database/migrations/add_formation_status_fields.sql`
   - Copiez tout le contenu
   - Collez dans l'éditeur SQL de Supabase
   - Cliquez sur "Run" (ou Ctrl+Enter)

4. **Vérifiez les Résultats**
   - Vous devriez voir "Success. No rows returned"
   - Allez dans "Table Editor" → "registrations"
   - Vérifiez que les nouvelles colonnes apparaissent:
     - `status`
     - `formation_type`
     - `payment_proof_url`
     - `confirmed_at`

### Option 2: Via Supabase CLI (Avancé)

```bash
# Installer Supabase CLI si nécessaire
npm install -g supabase

# Se connecter
supabase login

# Lier le projet
supabase link --project-ref <votre-project-ref>

# Appliquer la migration
supabase db push
```

---

## Vérification Post-Migration

### Tester la Structure

Exécutez cette requête SQL pour vérifier:

```sql
-- Vérifier les colonnes
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'registrations'
ORDER BY ordinal_position;

-- Vérifier les index
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'registrations';
```

### Tester l'Insertion

```sql
-- Test d'insertion avec les nouveaux champs
INSERT INTO registrations (
    full_name,
    email,
    whatsapp,
    formation_type,
    status,
    pack_type,
    price
) VALUES (
    'Test User',
    'test@example.com',
    '+221701234567',
    'Formation A - 5000 FCFA',
    'demande_recue',
    'Formation A',
    5000
);

-- Vérifier l'insertion
SELECT * FROM registrations ORDER BY created_at DESC LIMIT 1;
```

---

## Rollback (En cas de problème)

Si vous devez annuler la migration:

```sql
-- Supprimer les index
DROP INDEX IF EXISTS idx_registrations_status;
DROP INDEX IF EXISTS idx_registrations_created_at;
DROP INDEX IF EXISTS idx_registrations_formation_type;

-- Supprimer les colonnes
ALTER TABLE registrations DROP COLUMN IF EXISTS status;
ALTER TABLE registrations DROP COLUMN IF EXISTS formation_type;
ALTER TABLE registrations DROP COLUMN IF EXISTS payment_proof_url;
ALTER TABLE registrations DROP COLUMN IF EXISTS confirmed_at;
```

---

## Notes Importantes

- ✅ La migration utilise `IF NOT EXISTS` pour éviter les erreurs si déjà appliquée
- ✅ Les valeurs par défaut sont définies (`status` = 'demande_recue')
- ✅ Les index améliorent les performances des requêtes
- ⚠️ Sauvegardez vos données avant toute migration en production
