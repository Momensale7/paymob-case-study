import { Controller, Post, Body, UseGuards, Res, HttpStatus, Get, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentIntentionData } from 'src/interfaces/payment.interface';


@Controller('payment')
// @UseGuards(JwtAuthGuard) 
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Pay With Saved Card Token - 3DS Integration Flow through Unified Checkout.
   * Returns payment data with checkout URL for client-side redirection
   */
  @Post('intention/3ds')
  async create3DSIntention(@Body() paymentData: Partial<PaymentIntentionData>) {
    return this.paymentService.create3DSIntention(paymentData);
  }
  
  /**
   * Pay With Saved Card Token - 3DS Integration Flow through Unified Checkout.
   * Returns just checkout URL for testing 
   */
  @Post('intention/3ds/get-url')
  async getPaymentUrl(@Body() paymentData: Partial<PaymentIntentionData>) {
    const response = await this.paymentService.create3DSIntention(paymentData);
        return { 
      payment_url: response.checkoutUrl,
      message: "Copy this URL into your browser to complete payment"
    };
  }
  
  
  /**
   * MOTO Integration Flow through Unified Checkout
   * Returns payment data with checkout URL for client-side redirection
   */
  @Post('intention/moto')
  async createMOTOIntention(@Body() paymentData: Partial<PaymentIntentionData>) {
    return this.paymentService.createMOTOIntention(paymentData);
  }

  
  /**
   * Pay With Saved Card Token - Normal Moto Integration Flow
   */
  @Post('moto/pay')
  async payWithSavedCard(@Body() body: { payment_key: string; cardToken: string }) {
    const { payment_key, cardToken } = body;
    return this.paymentService.payWithSavedCard(payment_key, cardToken);
  }
}