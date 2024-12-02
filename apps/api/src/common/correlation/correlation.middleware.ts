import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '@prisma_/prisma.service';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: PrismaService) {}
  use(
    req: Request & { prismaService: PrismaService },
    res: Response,
    next: NextFunction,
  ) {
    const correlationId = req.headers['x-correlation-id'] || uuidv4();
    req.headers['x-correlation-id'] = correlationId;
    req.prismaService = this.prismaService;
    res.setHeader('x-correlation-id', correlationId);
    next();
  }
}
