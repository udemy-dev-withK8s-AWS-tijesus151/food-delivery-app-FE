import { Component, OnInit } from '@angular/core';
import { RestaurantListingModule } from '../restaurant-listing.module';
import { Restaurant } from 'src/app/shared/models/Restaurant';
import { Router } from '@angular/router';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-listing',
  templateUrl: './restaurant-listing.component.html',
  styleUrls: ['./restaurant-listing.component.css']
})
export class RestaurantListingComponent implements OnInit {

  //public restaurantList: Restaurant[];
  public restaurantList: Restaurant[] = [];
  //restaurantList: Restaurant[] = [{id:0, name:'', address:'', city:'', restaurantDescription:''}];
  
  constructor(private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getAllRestaurant();
  }

  getAllRestaurant(){
    this.restaurantService.getAllRestaurants()
    .subscribe(
      data => {
        this.restaurantList = data;
      }
    );
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  getRandomImage(): string {
    const imageCount = 8; // Adjust this number based on the number of images in your asset folder
    const randomIndex = this.getRandomNumber(1, imageCount);
    return `${randomIndex}.jpg`; // Replace with your image filename pattern
  }

  onButtonClick(id: number) {
    this.router.navigate(['/food-catalogue', id]);
  }

}
