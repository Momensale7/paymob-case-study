export interface PaymentItemData {
    name: string;
    amount: number;
    description: string;
    quantity: number;
}

export interface BillingData {
    apartment: string;
    first_name: string;
    last_name: string;
    building: string;
    phone_number: string;
    country: string;
    email: string;
    floor: string;
    state: string;
}

export interface CustomerData {
    first_name: string;
    last_name: string;
    email: string;
    extras?: Record<string, any>;
}

export interface PaymentIntentionData {
    amount: number;
    currency: string;
    payment_methods: number[];
    items: PaymentItemData[];
    billing_data: BillingData;
    customer: CustomerData;
    extras?: Record<string, any>;
}
export type PaymenyKey = {
   integration: number,
   key: string,
   gateway_type: string,
   iframe_id: number,
   order_id: number,
   redirection_url: string,
   save_card: boolean
}



export interface PaymentIntentionResponse {
    id: string;
    created_at: string;
    amount_cents: number;
    token: string;
    client_secret:string
    payment_keys:PaymenyKey[]
}