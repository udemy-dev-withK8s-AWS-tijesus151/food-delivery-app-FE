import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { API_URL_RL } from 'src/app/constants/url';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService{
    private apiUrl = API_URL_RL + '/restaurant/fetchAllRestaurants';
    constructor(private httpClient: HttpClient){}

    getAllRestaurants(): Observable<any>{
        return this.httpClient.get<any>(`${this.apiUrl}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any){
        console.log('An error occurred:', error);
        return throwError(error.message || error);
    }
}