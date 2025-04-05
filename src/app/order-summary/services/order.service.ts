import { API_URL_Order } from 'src/app/constants/url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrderService{
    private apiUrl = API_URL_Order+'/order/saveOrder';

    httpOptions = {
        headers: new HttpHeaders({
            'content-type': 'text/plain',
            'Access-Control-Allow-Origin': 'http://localhost:4200'
        })
    };

    constructor(private httpClient: HttpClient){}

    saveOrder(data: any): Observable<any>{
        return this.httpClient.post<any>(this.apiUrl, data);
    }

    private handleError(error: any){
        console.log('An error occurred:', error);
        return throwError(error.message || error);
    }
}