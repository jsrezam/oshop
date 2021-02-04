import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent{

  orders$: Observable<any>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService ) {
      this.orders$ = authService.user$.pipe(
        // tslint:disable-next-line: no-non-null-assertion
        switchMap(u => this.orderService.getOrdersByUser( u!.uid))
      );
    }

}
