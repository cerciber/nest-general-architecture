import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  categories(): string {
    return 'List of categories';
  }

  @Get(':id')
  categoryDetail(@Param('id') id: string): string {
    return `Category ${id}`;
  }

  @Get(':id/products/:productId')
  categoryProduct(
    @Param('id') id: string = '',
    @Param('productId') productId: string = '',
    @Query('query1') query1: string = '',
  ): string {
    return `Category ${id} product ${productId} on query ${query1}`;
  }
}
