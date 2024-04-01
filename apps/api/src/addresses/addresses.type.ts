import { SearchPaginationDto } from '@common/dto/searchPagination.dto';

export interface AddressesFindAllArgs {
  query: SearchPaginationDto;
  userId: string;
}

export interface AddressesFindOneArgs {
  addressId: string;
  userId: string;
}
