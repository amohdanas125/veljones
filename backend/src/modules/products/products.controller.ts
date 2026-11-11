import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(
    @Query('collection') collection?: string,
    @Query('category') category?: string,
    @Query('gender') gender?: string,
    @Query('search') search?: string,
    @Query('limit') limit?: string,
  ) {
    return this.productsService.findAll({
      collection,
      category,
      gender,
      search,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get('sections')
  async getSections() {
    return this.productsService.getCatalogGroupedBySection();
  }

  @Get('collections')
  async getCollections() {
    return this.productsService.getCollections();
  }

  @Get('reels')
  async getReels() {
    return this.productsService.getReels();
  }

  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productsService.findById(parseInt(id, 10));
  }
}
