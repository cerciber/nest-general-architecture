import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsController } from './controllers/products/products.controller';

@Module({
  imports: [],
  controllers: [AppController, CategoriesController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
