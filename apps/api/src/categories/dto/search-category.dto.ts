import { SearchPaginationDto } from '@common/dto/searchPagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchCategoryDto extends SearchPaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  categoryId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: Boolean })
  parentOnly?: string;
}
