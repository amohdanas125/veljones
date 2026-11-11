import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  async getWishlist(@Query('sessionId') sessionId: string) {
    return this.wishlistService.getWishlist(sessionId || 'guest');
  }

  @Post('toggle')
  async toggleWishlist(
    @Body() body: { sessionId: string; productId: number },
  ) {
    return this.wishlistService.toggleWishlist(body.sessionId || 'guest', body.productId);
  }

  @Delete(':productId')
  async removeItem(
    @Param('productId') productId: string,
    @Query('sessionId') sessionId: string,
  ) {
    return this.wishlistService.removeItem(sessionId || 'guest', parseInt(productId, 10));
  }
}
