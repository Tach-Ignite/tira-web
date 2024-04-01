import { SearchOrderDto } from './dto/search-order.dto';

export interface OrdersFindAllArgs {
  query: SearchOrderDto;
  userId?: string;
}

export interface OrdersFindOneArgs {
  orderId: string;
  userId?: string;
}
