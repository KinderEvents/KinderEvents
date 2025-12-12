// EmailJS Configuration
// Pour configurer EmailJS:
// 1. Créez un compte sur https://www.emailjs.com/
// 2. Créez un service email
// 3. Créez un template avec les variables: {{name}}, {{boutique}}, {{whatsapp}}, {{pack}}
// 4. Remplacez les valeurs ci-dessous par vos propres clés

export const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_formation', // Remplacer par votre Service ID
    TEMPLATE_ID: 'template_formation', // Remplacer par votre Template ID
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // Remplacer par votre Public Key
    TO_EMAIL: 'eventskinder@gmail.com' // Email de destination (caché dans le template)
};

// Template EmailJS suggéré:
/*
Nouvelle Inscription - BOOST E-COMMERCE IA

Nom: {{name}}
Boutique: {{boutique}}
WhatsApp: {{whatsapp}}
Pack choisi: {{pack}}

Date: {{timestamp}}
*/
