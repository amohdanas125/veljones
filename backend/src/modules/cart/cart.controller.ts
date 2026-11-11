import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Query('sessionId') sessionId: string) {
    return this.cartService.getCart(sessionId || 'guest');
  }

  @Post()
  async addItem(
    @Body() body: { sessionId: string; productId: number; size: string; quantity?: number },
  ) {
    return this.cartService.addItem(
      body.sessionId || 'guest',
      body.productId,
      body.size || 'M',
      body.quantity || 1,
    );
  }

  @Patch(':itemId')
  async updateQuantity(
    @Param('itemId') itemId: string,
    @Body() body: { sessionId: string; quantity: number },
  ) {
    const id = isNaN(Number(itemId)) ? itemId : Number(itemId);
    return this.cartService.updateQuantity(body.sessionId || 'guest', id, body.quantity);
  }

  @Delete('clear')
  async clearCart(@Query('sessionId') sessionId: string) {
    return this.cartService.clearCart(sessionId || 'guest');
  }

  @Delete(':itemId')
  async removeItem(
    @Param('itemId') itemId: string,
    @Query('sessionId') sessionId: string,
  ) {
    const id = isNaN(Number(itemId)) ? itemId : Number(itemId);
    return this.cartService.removeItem(sessionId || 'guest', id);
  }
}
