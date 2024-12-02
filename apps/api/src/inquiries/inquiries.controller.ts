import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiAbstractResponse } from '@common/decorators';
import { InquiryEntity } from './entities/inquiry.entity';
import { AbstractApiResponse } from '@src/utils/general-response';
import { ApiAbstractPaginationResponse } from '@common/decorators/abstractPaginationResponse.decorator';
import { SearchPaginationDto } from '@common/dto/searchPagination.dto';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { Roles } from '@src/utils/roles.enums';
import { Public } from '@common/decorators/public.decorators';

@ApiTags('Inquiries')
@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  @Public()
  @ApiAbstractResponse({ model: InquiryEntity, statusCode: 'CREATED' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCategoryDto: CreateInquiryDto,
  ): Promise<AbstractApiResponse<InquiryEntity>> {
    const category = await this.inquiriesService.create(createCategoryDto);
    return AbstractApiResponse.created(
      category,
      'Your request has been submitted successfully.',
    );
  }

  @Get()
  @RoleAccess([Roles.SUPER_ADMIN])
  @ApiAbstractPaginationResponse(InquiryEntity)
  async findAll(@Query() query: SearchPaginationDto) {
    const { data, meta } = await this.inquiriesService.findAll(query);
    const inquiries = data.map((val) => new InquiryEntity(val));
    return AbstractApiResponse.success({ data: inquiries, meta });
  }

  @Get(':inquiryId')
  @RoleAccess([Roles.SUPER_ADMIN])
  @ApiAbstractResponse({ model: InquiryEntity })
  async findOne(
    @Param('inquiryId') inquiryId: string,
  ): Promise<AbstractApiResponse<InquiryEntity>> {
    const inquiry = await this.inquiriesService.findOne(inquiryId);
    return AbstractApiResponse.success(inquiry);
  }

  @Patch(':inquiryId')
  @RoleAccess([Roles.SUPER_ADMIN])
  @ApiAbstractResponse({ model: InquiryEntity })
  async update(
    @Param('inquiryId') inquiryId: string,
    @Body() updateInquiryDto: UpdateInquiryDto,
  ): Promise<AbstractApiResponse<InquiryEntity>> {
    const updatedInquiry = await this.inquiriesService.update(
      inquiryId,
      updateInquiryDto,
    );
    return AbstractApiResponse.success(updatedInquiry);
  }
}
