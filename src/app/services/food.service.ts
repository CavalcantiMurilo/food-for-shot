import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Food} from "../Food";

import {environment} from "../../environments/environment";
import {Response} from "../Response";

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;
  constructor(private http: HttpClient) { }

  getFood(): Observable<Response<Food[]>>{
    return this.http.get<Response<Food[]>>(this.apiUrl)
  }

  getThisFood(id: number): Observable<Response<Food>>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Food>>(url)
  }


  createFood(formData: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl, formData);
  }
}
