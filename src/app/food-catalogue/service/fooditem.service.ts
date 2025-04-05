import { Injectable } from '@angular/core';
import { API_URL_FC } from 'src/app/constants/url';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FoodCataloguePage } from 'src/app/shared/models/FoodCataloguePage';

@Injectable({
    providedIn: 'root'
})
export class FoodItemService{
    private apiUrl = API_URL_FC+'/foodCatalogue/fetchRestaurantAndFoodItemById/';

    constructor(private httpClient: HttpClient){}

    getFoodItemsByRestaurant(id: number): Observable<FoodCataloguePage>{
        return this.httpClient.get<FoodCataloguePage>(`${this.apiUrl+id}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any){
        console.log('An error occurred:', error);
        return throwError(error.message || error);
    }
}