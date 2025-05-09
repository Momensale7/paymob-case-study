import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentIntentionData } from 'src/interfaces/payment.interface';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('payment')
@UseGuards(JwtAuthGuard) 
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
      /**
     * Pay With Saved Card Token- 3DS Integration Flow through Unified Checkout.
     */
  @Post('intention/3ds')
  async create3DSIntention(@Body() paymentData: Partial<PaymentIntentionData>) {
    return this.paymentService.create3DSIntention(paymentData);
  }
  
  @Post('intention/moto')
  async createMOTOIntention(@Body() paymentData: Partial<PaymentIntentionData>) {
    return this.paymentService.createMOTOIntention(paymentData);
  }
    /**
    * Pay With Saved Card Token-Normal Moto Integration Flow
     */
  @Post('moto/pay')
  async payWithSavedCard(@Body() body: { payment_key: string; cardToken: string }) {
    const { payment_key, cardToken } = body;
    return this.paymentService.payWithSavedCard(payment_key, cardToken);
  }
  
}
