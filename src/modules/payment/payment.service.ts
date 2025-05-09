import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { createIntention, payWithMoto } from 'src/utilties/payment.utils';
import { PaymentIntentionData } from 'src/interfaces/payment.interface';

@Injectable()
export class PaymentService {
    private readonly secretKey: string;
    private readonly threeDSIntegrationId: number;
    private readonly motoIntegrationId: number;
    
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
    }
    
    /**
     * Pay With Saved Card Token- 3DS Integration Flow through Unified Checkout.
     */
    async create3DSIntention(paymentData: Partial<PaymentIntentionData>): Promise<any> {
        return createIntention(this.http, this.secretKey, paymentData, this.threeDSIntegrationId);
    }
    
    /**
     * Create a payment intention using MOTO integration (for saved cards)
     */
    async createMOTOIntention(paymentData: Partial<PaymentIntentionData>,): Promise<any> {

            
        return createIntention(this.http, this.secretKey, paymentData, this.motoIntegrationId);
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
    * 
    */
    async payWithSavedCard(payment_key:string,cardToken:string): Promise<any> {
        return payWithMoto(this.http, this.secretKey, payment_key, cardToken );
    }
}