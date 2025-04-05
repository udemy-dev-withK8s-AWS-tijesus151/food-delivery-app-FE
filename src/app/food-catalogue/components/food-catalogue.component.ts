import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../service/fooditem.service';
import { FoodCataloguePage } from 'src/app/shared/models/FoodCataloguePage';
import { FoodItem } from 'src/app/shared/models/FoodItem';

@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.component.html',
  styleUrls: ['./food-catalogue.component.css']
})
export class FoodCatalogueComponent implements OnInit {
  restaurantId: number=0;
  foodItemResponse!: FoodCataloguePage;
  foodItemCart: FoodItem[] = [];
  orderSummary!: FoodCataloguePage;
  
  constructor(private route: ActivatedRoute
      , private foodItemService: FoodItemService
      , private router: Router) {}

  initialize(){
    this.route.paramMap.subscribe(params => {
      this.restaurantId = +params.get('id')!;
    });

    return this.getFoodItemsByRestaurant(this.restaurantId);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = +params.get('id')!;
    });

    this.getFoodItemsByRestaurant(this.restaurantId);
  }

  getFoodItemsByRestaurant(restaurant: number) {
    this.foodItemService.getFoodItemsByRestaurant(restaurant).subscribe(
      data => {
        this.foodItemResponse = data;
        console.log('data', data);
        console.log('foodItemResponse', this.foodItemResponse);
      }
    );
    //console.log('foodItemResponse', this.foodItemResponse);
    return this.foodItemResponse;
  }

  increment(food: any) {
    food.quantity++;
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      // If record does not exist, add it to the array
      this.foodItemCart.push(food);
    } else {
      // If record exists, update it in the array
      this.foodItemCart[index] = food;
    }
  }

  decrement(food: any) {
    if (food.quantity > 0) {
      food.quantity--;

      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        // If record exists, update it in the array
        this.foodItemCart[index] = food;
      }

    }
  }

  onCheckOut() {
    this.foodItemCart;
    this.orderSummary = {
      foodItemsList: [],
      restaurant: null!
    }
    this.orderSummary.foodItemsList = this.foodItemCart;
    this.orderSummary.restaurant = this.foodItemResponse.restaurant;
    this.router.navigate(['/orderSummary'], { queryParams: { data: JSON.stringify(this.orderSummary) } });
  }

}
