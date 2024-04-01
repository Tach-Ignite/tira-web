import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiAbstractPaginationResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          {
            properties: {
              data: {
                allOf: [
                  {
                    properties: {
                      data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) },
                      },
                    },
                  },
                  {
                    properties: {
                      meta: {
                        type: 'object',
                        properties: {
                          total: { type: 'number' },
                          lastPage: { type: 'number' },
                          currentPage: { type: 'number' },
                          perPage: { type: 'number' },
                          prev: { type: 'number' },
                          next: { type: 'number' },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },

          {
            properties: {
              error: {
                type: 'object',
              },
            },
          },
          {
            properties: {
              message: {
                type: 'string',
              },
            },
          },
          {
            properties: {
              statusCode: {
                type: 'string',
                enum: [HttpStatus.OK],
              },
            },
          },
        ],
      },
    }),
  );
};
