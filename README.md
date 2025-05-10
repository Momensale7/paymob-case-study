# Paymob NestJS Integration – Technical Assessment

This project is a backend NestJS application built as part of the Paymob Engineering Team technical assessment. It integrates Paymob’s payment services using 3DS and MOTO flows, offering a unified checkout process and card token-based payments.

## 🧾 Features

- Create 3DS payment intentions
- Retrieve 3DS checkout URLs
- Create MOTO payment intentions
- Make direct payments with saved card tokens

---

## 📁 Project Structure

src/
│
├── payment/
│ ├── payment.controller.ts # Payment endpoints
│ ├── payment.service.ts # Business logic and Paymob interaction
│
├── utilties/
│ └── payment.utils.ts # Reusable Paymob HTTP utility functions
│
├── interfaces/
│ └── payment.interface.ts # Types/interfaces for Payment Intentions
│
├── constants/
│ └── payment.constants.ts # Default values, API endpoints, card token

## 🛠 Installation

1. **Clone the repository**
   git clone https://github.com/Momensale7/paymob-case-study.git
   cd paymob-case-study
Install dependencies

npm install
Environment Variables

Create a .env file at the root:

PAYMOB_API_KEY="ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRBek9EQXpNeXdpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS55N25WYTJjV3V2Q3lEUDVMWk43VTFqTFBvU29yaUlMWkpLY25qSlhMYXBoS0hQOTliZWJqb0FOSkMybWg3eUo1MU95UXBERVBPWllWazJzaWJCSGRXUQ=="
PAYMOB_HMAC_SECRET=44D5E04376B96EFC7E90E90E1B7EFE9D
PAYMOB_SECRET_KEY=egy_sk_test_d8b80e338140d0df9dcd3a35ab65c5471bd0629ad474a39b5164da8aedbc81d7
PAYMOB_3DS_INTEGRATION_ID=5048104
PAYMOB_MOTO_INTEGRATION_ID=5078185
MID=1038033
JWT_SECRET="jhy300"


npm run start:dev
📡 API Endpoints
POST /payment/intention/3ds
Create a 3DS payment intention and return payment details with checkout URL.

Body:

{
  "amount": 10000,
  "currency": "EGP",
  "billing_data": { ... },
  "customer": { ... }
}
POST /payment/intention/3ds/get-url
Returns only the checkout URL for testing or redirect.

Body: Same as above
{
  "payment_url": "https://accept.paymob.com/unifiedcheckout/...",
  "message": "Copy this URL into your browser to complete payment"
}
POST /payment/intention/moto
Create a MOTO payment intention (useful for saved card tokens).

POST /payment/moto/pay
Complete payment with a saved card token.

Body:

{
  "payment_key": "generated-key-from-intention",
  "cardToken": "your-saved-card-token"
}
