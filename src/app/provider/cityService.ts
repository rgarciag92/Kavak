import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()

export class CityService {
    cities: any= [];
    constructor(private http: HttpClient) { }
    getCities() {
        return this.http.get("http://jsonplaceholder.typicode.com/users").pipe(
            map((resp) => {
                this.cities = resp;
                return this.cities;
            })
        );
    }
}
