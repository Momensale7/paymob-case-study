import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { createIntention, payWithMoto } from 'src/utilties/payment.utils';
import { PaymentIntentionData } from 'src/interfaces/payment.interface';
import { Response } from 'express';

@Injectable()
export class PaymentService {
    private readonly secretKey: string;
    private readonly threeDSIntegrationId: number;
    private readonly motoIntegrationId: number;
    private readonly paymobPublicKey: string;
    
    constructor(
        private readonly http: HttpService,
        private readonly configService: ConfigService,
    ) {
        // Get secret key from environment variables
        const secretKey = this.configService.get<string>('PAYMOB_SECRET_KEY');
        if (!secretKey) {
            throw new Error('PAYMOB_SECRET_KEY is not defined in the configuration');
        }
        this.secretKey = secretKey;
        
        // Get integration IDs from environment variables
        const threeDSId = this.configService.get<string>('PAYMOB_3DS_INTEGRATION_ID');
        const motoId = this.configService.get<string>('PAYMOB_MOTO_INTEGRATION_ID');
        
        if (!threeDSId || !motoId) {
            throw new Error('Integration IDs are not properly configured in environment variables');
        }
        
        this.threeDSIntegrationId = parseInt(threeDSId, 10);
        this.motoIntegrationId = parseInt(motoId, 10);
        
        // Get Paymob public key
        this.paymobPublicKey = this.configService.get<string>('PAYMOB_PUBLIC_KEY') || 'egy_pk_test_XA973eh5WQh1DGKShJzylICKDofvL8vJ';
    }
    
    /**
     * Pay With Saved Card Token- 3DS Integration Flow through Unified Checkout.
     * Returns full response with checkout URL
     */
    async create3DSIntention(paymentData: Partial<PaymentIntentionData>): Promise<any> {
        const response = await createIntention(this.http, this.secretKey, paymentData, this.threeDSIntegrationId);
                return {
            ...response,
            checkoutUrl: this.generateCheckoutUrl(response.client_secret)
        };
    }
    
    /**
     * Pay With Saved Card Token- 3DS Integration Flow with direct redirection
     */
    async create3DSIntentionAndRedirect(paymentData: Partial<PaymentIntentionData>, res: Response): Promise<any> {
        const response = await createIntention(this.http, this.secretKey, paymentData, this.threeDSIntegrationId);
        
        const checkoutUrl = this.generateCheckoutUrl(response.client_secret);
        return res.redirect(checkoutUrl);
    }
    
    /**
     * Create a payment intention using MOTO integration (for saved cards)
     */
    async createMOTOIntention(paymentData: Partial<PaymentIntentionData>): Promise<any> {
        const response = await createIntention(this.http, this.secretKey, paymentData, this.motoIntegrationId);
        return response
    }
    
    
    /**
     * Get the 3DS integration ID
     */
    getThreeDSIntegrationId(): number {
        return this.threeDSIntegrationId;
    }
    
    /**
     * Get the MOTO integration ID
     */
    getMOTOIntegrationId(): number {
        return this.motoIntegrationId;
    }
    
    /** 
    * Pay With Saved Card Token-Normal Moto Integration Flow
    */
    async payWithSavedCard(payment_key: string, cardToken: string): Promise<any> {
        return payWithMoto(this.http, this.secretKey, payment_key, cardToken);
    }
    
    /**
     * Generate Paymob checkout URL from client secret
     */
    private generateCheckoutUrl(clientSecret: string): string {
        return `https://accept.paymob.com/unifiedcheckout/?publicKey=${this.paymobPublicKey}&clientSecret=${clientSecret}`;
    }
    
}