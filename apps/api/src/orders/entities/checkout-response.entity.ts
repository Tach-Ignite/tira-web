import { ApiProperty } from '@nestjs/swagger';

export class CheckoutResponseEntity {
  @ApiProperty()
  orderId: string;
}
