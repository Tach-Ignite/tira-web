import { UpdateCategoryDto } from './dto/update-category.dto';

export interface UpdateCategoryArgs {
  categoryId: string;
  data: UpdateCategoryDto;
}

export interface CategoriesFindManyArgs {
  page?: string;
  perPage?: string;
  searchTerm?: string;
  categoryId?: string;
  parentOnly?: string;
}
