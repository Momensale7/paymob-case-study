
// API endpoints
export const API_ENDPOINTS = {
    INTENTION: 'https://accept.paymob.com/v1/intention/',
    moto: 'https://accept.paymob.com/api/acceptance/payments/pay',
  };
  
  // Default payment values
  export const DEFAULT_PAYMENT_VALUES = {
    CURRENCY: 'EGP',
    AMOUNT: 10,
    ITEM_NAME: 'Default Item',
    ITEM_DESCRIPTION: 'Default description',
    ITEM_QUANTITY: 1,
  };
  
  // Payment method types
  export const PAYMENT_METHODS = {
    THREE_DS: '3DS',
    MOTO: 'MOTO',
  } 
  export const CARD_TOKEN ="2456c654b8820eb6ab5b301adc8d5bee716f076b8ff2939f95c016d9";