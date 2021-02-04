import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  // tslint:disable-next-line: typedef
  async placeOrder(order: any){
    const result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  // tslint:disable-next-line: typedef
  getOrders(){
    return this.db.list('/orders')
    .snapshotChanges()
    .pipe(
      map((orders: any) =>
        orders.map((o: any) => ({key: o.payload.key, ...o.payload.val()})))
    );
  }

  // tslint:disable-next-line: typedef
  getOrdersByUser(userId: string){
    console.log(userId);
    return this.db.list('/orders', query => query.orderByChild('userId').equalTo(userId))
    .snapshotChanges()
    .pipe(
      map((orders: any) =>
        orders.map((o: any) => ({key: o.payload.key, ...o.payload.val()})))
    );
  }
}
