import { Component, OnInit } from '@angular/core';
import { OrderDTO } from '../models/OrderDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  orderSummary?: OrderDTO;
  obj?: any;
  showDialog: boolean = false;
  total?: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    const data = this.route.snapshot.queryParams['data'];
    this.obj = JSON.parse(data);
    this.obj!.userId=1;
    this.orderSummary = this.obj;

    this.total = this.orderSummary?.foodItemsList?.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.quantity! * currentValue.price);
    }, 0);

  }

  saveOrder() {
    this.orderService.saveOrder(this.orderSummary)
      .subscribe(
        response => {
            this.showDialog = true;
        },
        error => {
          console.error('Failed to save data:', error);
        }
      );
  }

  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/']); // Replace '/home' with the actual route for your home page
  }

}
