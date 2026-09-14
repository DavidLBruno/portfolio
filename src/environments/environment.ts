// Replaced by environment.prod.ts in production builds (see angular.json).
export const environment = {
  baseUrl: 'http://localhost:4200',
  production: false,
  // EmailJS credentials are public by design (they ship in the browser bundle).
  // Abuse is prevented from the EmailJS dashboard: restrict "Allowed origins"
  // to the production domain and keep the monthly quota low.
  emailjs: {
    serviceId: 'service_ecan7om',
    templateId: 'template_3a4iifo',
    publicKey: 'oOnC2LcHyRp5NO0CE',
  },
};
