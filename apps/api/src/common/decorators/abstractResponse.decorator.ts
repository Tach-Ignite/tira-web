import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiAbstractResponse = <TModel extends Type<any>>({
  model,
  statusCode = 'OK',
  isArray = false,
}: {
  model: TModel;
  statusCode?: keyof typeof HttpStatus;
  isArray?: boolean;
}) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          isArray
            ? {
                properties: {
                  data: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              }
            : {
                properties: {
                  data: {
                    $ref: getSchemaPath(model),
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
                enum: [HttpStatus[statusCode]],
              },
            },
          },
        ],
      },
    }),
  );
};
