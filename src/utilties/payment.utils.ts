import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PaymentIntentionData, PaymentIntentionResponse } from '../interfaces/payment.interface';
import { API_ENDPOINTS, DEFAULT_PAYMENT_VALUES } from '../constants/payment.constants';
import { CARD_TOKEN } from './../constants/payment.constants';

export async function createIntention(
    http: HttpService,
    secretKey: string,
    paymentData: Partial<PaymentIntentionData>,
    integrationId: number
): Promise<PaymentIntentionResponse> {
    // Use provided data or fall back to defaults if specific fields are missing
    const requestData = {
        card_tokens:[CARD_TOKEN],
        amount: paymentData.amount || DEFAULT_PAYMENT_VALUES.AMOUNT,
        currency: paymentData.currency || DEFAULT_PAYMENT_VALUES.CURRENCY,
        payment_methods: [integrationId],
        items: paymentData.items || [
            {
                name: DEFAULT_PAYMENT_VALUES.ITEM_NAME,
                amount: paymentData.amount || DEFAULT_PAYMENT_VALUES.AMOUNT,
                description:DEFAULT_PAYMENT_VALUES.ITEM_DESCRIPTION,
                quantity: DEFAULT_PAYMENT_VALUES.ITEM_QUANTITY
            }
        ],
        billing_data: paymentData.billing_data || {
            apartment: "6",
            first_name: "momen",
            last_name: "saleh",
            building: "939",
            phone_number: "+201015303865",
            country: "egypt",
            email: "momensaleh2468@gmail.com",
            floor: "1",
            state: "cairo"
        },
        customer: paymentData.customer || {
            first_name: "momen",
            last_name: "saleh",
            email: "momensaleh2468@gmail.com",
        },
        extras: paymentData.extras || {}
    };
    
    const response = await firstValueFrom(
        http.post(
            API_ENDPOINTS.INTENTION,
            requestData,
            {
                headers: {
                    Authorization: `Token ${secretKey}`,
                },
            },
        ),
    );
    
    return response.data as PaymentIntentionResponse;
}
export async function payWithMoto(
    http: HttpService,
    secretKey: string,
    payment_key:string,
    cardToken:string
): Promise<PaymentIntentionResponse> {
    
    const response = await firstValueFrom(
        http.post(
            API_ENDPOINTS.moto,
            {   source: 
                {     
            identifier: cardToken, //obtained from the save card callback
            subtype: "TOKEN"   
          },  
     payment_token: payment_key //obtained from the intention request under the Moto integration ID
    },
            {
                headers: {
                    Authorization: `Token ${secretKey}`,
                },
            },
        ),
    );
    
    return response.data as PaymentIntentionResponse;
}
