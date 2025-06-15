import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BuyRequest, CreateBuyRequestDto } from './buy-request-model';

@Injectable({
  providedIn: 'root'
})
export class BuyRequestService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/buy-request';

  buyRequests = signal<BuyRequest[]>([]);
  loading = signal(true);

  getBuyRequests() {
    this.loading.set(true);

    return this.http.get<BuyRequest[]>(`${this.apiUrl}?_limit=10`).subscribe({
      next: (data) => {
        this.buyRequests.set(data);
      },
      error: (err) => {
        console.error('Get request failed', err);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  addBuyRequest(payload: CreateBuyRequestDto) {
    return this.http.post(this.apiUrl, payload);
  }

  getBuyRequestById(id: string) {
    return this.http.get<BuyRequest>(`${this.apiUrl}/${id}`);
  }

}
