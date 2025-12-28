// PayDunya Configuration
// Documentation: https://paydunya.com/developers/

const PAYDUNYA_CONFIG = {
    // Clés API (à obtenir sur https://app.paydunya.com/developers)
    MASTER_KEY: '6VUnP6H0-gi9N-PiUD-zDoc-bftJhRa465CG', // Votre Master Key
    PRIVATE_KEY: 'live_private_i7mhrdSTVNUFOmBSYz5MAEeWYyO',
    PUBLIC_KEY: 'live_public_UibWRj7mNcZlB0NbgwNhcNzqxIF',
    TOKEN: 'CTBr08AgBoZjYOuEGDCX',

    // Configuration
    MODE: 'live', // 'test' ou 'live'

    // URLs
    CALLBACK_URL: 'https://kinder-events.vercel.app/payment/success',
    CANCEL_URL: 'https://kinder-events.vercel.app/payment/cancel',
    IPN_URL: 'https://kinder-events.vercel.app/api/payment/confirm',

    // Informations boutique
    STORE_NAME: 'VisionR AI Studio',
    STORE_TAGLINE: 'Formation & Services IA',
    STORE_PHONE: '+221 70 492 52 39',
    STORE_LOGO: 'https://kinder-events.vercel.app/logo.png',
    STORE_WEBSITE: 'https://kinder-events.vercel.app'
};

export default PAYDUNYA_CONFIG;
