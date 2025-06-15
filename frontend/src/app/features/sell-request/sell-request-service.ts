import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CreateSellRequestDto } from './sell-request-model';


@Injectable({
  providedIn: 'root'
})
export class SellRequestService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/sell-request';

  loading = signal(true);

    addSellRequest(payload: CreateSellRequestDto) {
      return this.http.post(this.apiUrl, payload);
    }
}
