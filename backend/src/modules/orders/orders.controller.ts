import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { OrdersService, CheckoutDto } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  async checkout(@Body() body: CheckoutDto) {
    return this.ordersService.createOrder(body);
  }

  @Get(':orderNumber')
  async getOrder(@Param('orderNumber') orderNumber: string) {
    return this.ordersService.getOrderByNumber(orderNumber);
  }
}
