import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ResourceUnion } from './app.models';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private apiUrl = 'https://ex01-comp590-140-25sp-rileyac.apps.unc.edu';
  constructor(private http: HttpClient) {}

  createResource(resource: ResourceUnion): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/resources`, resource);
  }
}
