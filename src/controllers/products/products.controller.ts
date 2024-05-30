import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  products(): string {
    return 'List of products';
  }

  @Get(':id')
  productsDetail(@Param('id') id: string): string {
    return `Product ${id}`;
  }
}
