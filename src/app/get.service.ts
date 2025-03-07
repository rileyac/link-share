import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceUnion } from './app.models';

@Injectable({
  providedIn: 'root',
})
export class GetService {
  private apiUrl = 'https://ex01-comp590-140-25sp-rileyac.apps.unc.edu';
  constructor(private http: HttpClient) {}

  getResources(type?: string): Observable<ResourceUnion[]> {
    let params = new HttpParams();

    if (type) {
      params = params.append('type', type); // add type filter if provided
    }

    return this.http.get<ResourceUnion[]>(`${this.apiUrl}/admin`, { params });
  }
}
